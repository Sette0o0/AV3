// pra funcionar o banco tem q estar no estado de criado agora sem ter adicionado nenhum registro além do default
import axios from "axios";
import fs from "fs";

const CONCURRENCIES = [1, 5, 10];
const OUTPUT_FILE = "metricsAero.json";
const PORT = 3001;
const host = `http://localhost:${PORT}/api/`;

let CODE_COUNTER = 0;
let AERO_ID_COUNTER = 16

function generateCode() {
  CODE_COUNTER++
  return `codigo-${CODE_COUNTER}`;
}

function getDynamicAeroIdUrl(baseUrl) {
  const url = baseUrl.replace(/\/\d+$/, `/${AERO_ID_COUNTER}`);
  AERO_ID_COUNTER--;
  return url;
}

const ROUTES = [
  {
    method: "POST",
    url: host + "aeronave",
    dataKey: "create"
  },
  { method: "GET", url: host + "aeronave" },
  { method: "GET", url: host + "aeronave/1" },
  { method: "GET", url: host + "aeronave/codigo/codigo-1" },
  {
    method: "PUT",
    url: host + "aeronave/1",
    dataKey: "update"
  },
  {
    method: "DELETE",
    url: () => host + getDynamicAeroIdUrl("aeronave/1")
  }
];

const BODY_DATA = {
  create: () => ({
    codigo: generateCode(),
    modelo: "Boeing",
    tipo: "Comercial",
    capacidade: 200,
    alcance: 8000
  }),

  update: {
    modelo: "Boeing 737",
    tipo: "Comercial",
    capacidade: 210,
    alcance: 8200
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
