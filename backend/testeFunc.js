// pra funcionar o banco tem q estar no estado de criado agora sem ter adicionado nenhum registro além do default
import axios from "axios";
import fs from "fs";

const CONCURRENCIES = [1, 5, 10];
const OUTPUT_FILE = "metricsFunc.json";
const PORT = 3001;
const host = `http://localhost:${PORT}/api/`;

let CODE_COUNTER = 1;
let ID_COUNTER = 17

function generateCode() {
  CODE_COUNTER++
  return `user-${CODE_COUNTER}`;
}

function getDynamicAeroIdUrl(baseUrl) {
  const url = baseUrl.replace(/\/\d+$/, `/${ID_COUNTER}`);
  ID_COUNTER--;
  return url;
}

const ROUTES = [
  {
    method: "POST",
    url: host + "funcionario",
    dataKey: "create"
  },
  { method: "GET", url: host + "funcionario" },
  { method: "GET", url: host + "funcionario/1" },
  { method: "GET", url: host + "funcionario/user/user-2" },
  {
    method: "PUT",
    url: host + "funcionario/2",
    dataKey: "update"
  },
  {
    method: "DELETE",
    url: () => host + getDynamicAeroIdUrl("funcionario/2")
  }
];

const BODY_DATA = {
  create: () => ({
    usuario: generateCode(),
    nome: "teste",
    telefone: "12122122121",
    endereco: "rua 200",
    senha: "8000",
    nivel_permissao: "Operador"
  }),

  update: {
    nome: "testeaaaaa",
    telefone: "12122122151",
    endereco: "rua 201",
    senha: "8080",
    nivel_permissao: "Operador"
  }
};

function calculateAverages(measures) {
  const valid = measures.filter(m => !m.error);

  const avg = (field) =>
    valid.reduce((acc, m) => acc + m[field], 0) / (valid.length || 1);

  return {
    avgResponseTime: Number(avg("responseTime").toFixed(2)),
    avgProcessingTime: Number(avg("processingTime").toFixed(2)),
    avgLatency: Number(avg("latency").toFixed(2)),
    errors: measures.filter(m => m.error).length
  };
}

async function measureRoute(route) {
  const results = [];

  for (const concurrency of CONCURRENCIES) {
    const promises = [];

    for (let i = 0; i < concurrency; i++) {
      promises.push(new Promise(async (resolve) => {
        const start = performance.now();

        try {
          const dataPayload =
            route.dataKey === "create"
              ? BODY_DATA.create()
              : route.dataKey
              ? BODY_DATA[route.dataKey]
              : null;

          const res = await axios({
            method: route.method,
            url: typeof route.url === "function" ? route.url() : route.url,
            data: dataPayload,
            validateStatus: () => true
          });

          if (route.method === "POST" && res.data?.aeronave?.id_aero) {
            createdIds.push(res.data.aeronave.id_aero);
          }

          const end = performance.now();
          const responseTime = end - start;
          const processingTime = parseFloat(res.data?.processingTime || 0);
          const latency = responseTime - processingTime;

          resolve({
            status: res.status,
            responseTime: Number(responseTime.toFixed(2)),
            processingTime: Number(processingTime.toFixed(2)),
            latency: Number(latency.toFixed(2))
          });

        } catch (err) {
          resolve({
            error: true,
            message: err.message,
            responseTime: null,
            processingTime: null,
            latency: null
          });
        }
      }));
    }

    const batchResults = await Promise.all(promises);
    results.push({
      concurrency,
      averages: calculateAverages(batchResults)
    });
  }

  return { route: typeof route.url === "function" ? "dynamic-url" : route.url, method: route.method, results };
}

async function runTests() {
  const allMetrics = [];

  for (const route of ROUTES) {
    console.log(`Testando rota: [${route.method}] ${route.url}`);
    const metrics = await measureRoute(route);
    allMetrics.push(metrics);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allMetrics, null, 2));

  console.log("\nTeste finalizado!");
  console.log(`Resultados salvos em: ${OUTPUT_FILE}`);
}

await runTests();
