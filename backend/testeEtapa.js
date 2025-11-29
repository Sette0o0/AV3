// pra funcionar o banco tem q estar no estado de criado agora sem ter adicionado nenhum registro além do default
import axios from "axios";
import fs from "fs";

const CONCURRENCIES = [1, 5, 10];
const OUTPUT_FILE = "metricsEtapa.json";
const PORT = 3001;
const host = `http://localhost:${PORT}/api/`;

let ID_COUNTER = 17;

function getDynamicEtapaIdUrl(baseUrl) {
  const url = baseUrl.replace(/\/\d+$/, `/${ID_COUNTER}`);
  ID_COUNTER--;
  return url;
}

const ROUTES = [
  {
    method: "POST",
    url: host + "etapa",
    dataKey: "create"
  },

  {
    method: "PUT",
    url: host + "etapa/status/17",
    dataKey: "updateStatus"
  },

  {
    method: "PUT",
    url: () => host + getDynamicEtapaIdUrl("etapa/funcionarios/17"),
    dataKey: "addFuncs"
  }
];

const BODY_DATA = {
  create: () => ({
    nome: "Etapa Teste",
    prazo: new Date().toISOString(),
    aero_id: 17
  }),

  updateStatus: {
    status: "Concluída"
  },

  addFuncs: {
    funcionarios: [1]
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
          const payload =
            route.dataKey && BODY_DATA[route.dataKey]
              ? typeof BODY_DATA[route.dataKey] === "function"
                ? BODY_DATA[route.dataKey]()
                : BODY_DATA[route.dataKey]
              : null;

          const res = await axios({
            method: route.method,
            url: typeof route.url === "function" ? route.url() : route.url,
            data: payload,
            validateStatus: () => true
          });

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

  return {
    route: typeof route.url === "function" ? "dynamic-url" : route.url,
    method: route.method,
    results
  };
}

async function runTests() {
  const metrics = [];

  for (const route of ROUTES) {
    console.log(`Testando rota: [${route.method}] ${route.url}`);
    metrics.push(await measureRoute(route));
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metrics, null, 2));

  console.log("\nTeste finalizado!");
  console.log(`Resultados salvos em: ${OUTPUT_FILE}`);
}

await runTests();
