// pra funcionar o banco tem que estar no estado de criado, sem registros além dos defaults
import axios from "axios";
import fs from "fs";

const CONCURRENCIES = [1, 5, 10];
const OUTPUT_FILE = "metricsTeste.json";
const PORT = 3001;
const host = `http://localhost:${PORT}/api/`;

const ROUTES = [
  {
    method: "POST",
    url: host + "teste",
    dataKey: "create"
  }
];

const BODY_DATA = {
  create: () => ({
    tipo: "Elétrico",
    resultado: "Aprovado",
    aero_id: 17
  })
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
            url: route.url,
            data: payload,
            validateStatus: () => true
          });

          const end = performance.now();
          const responseTime = end - start;

          const rawProcessing = String(res.data?.processingTime || "0").replace(" ms", "");
          const processingTime = parseFloat(rawProcessing) || 0;

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
    route: route.url,
    method: route.method,
    results
  };
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
