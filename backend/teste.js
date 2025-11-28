import axios from "axios";
import { performance } from "perf_hooks";
import fs from "fs";

async function testar(endpoint, metodo = "GET", body = null, repeticoes = 10, rota = "default") {
  console.log(`\n🔍 Testando: ${metodo} ${endpoint}`);
  console.log(`➡️ Executando ${repeticoes} requisições...\n`);

  const resultados = [];

  for (let i = 0; i < repeticoes; i++) {
    const inicio = performance.now();

    try {
      const res = await axios({
        url: endpoint,
        method: metodo,
        data: body
      });

      const fim = performance.now();
      const tempoResposta = fim - inicio;

      let TempoProcessamento = null;
      if (res.data.processingTime) {
        TempoProcessamento = Number(res.data.processingTime.split(" ")[0]);
      }

      resultados.push({
        status: res.status,
        tempoResposta,
        tempoProcessamento: TempoProcessamento
      });

    } catch (err) {
      resultados.push({
        status: err.response?.status || "ERR",
        tempoResposta: null,
        tempoProcessamento: null
      });
    }
  }

  const temposValidos = resultados.filter(r => r.tempoResposta !== null);
  const media = temposValidos.reduce((acc, r) => acc + r.tempoResposta, 0) / temposValidos.length;

  const min = Math.min(...temposValidos.map(r => r.tempoResposta));
  const max = Math.max(...temposValidos.map(r => r.tempoResposta));

  console.table(
    resultados.map((r, i) => ({
      Requisição: i + 1,
      Status: r.status,
      "Latência (ms)": r.tempoResposta ? Number(r.tempoResposta.toFixed(2)) : "-",
      "Proc. Interno (ms)": r.tempoProcessamento || "-"
    }))
  );

  const resumo = {
    timestamp: new Date().toISOString(),
    endpoint,
    metodo,
    repeticoes,
    mediaMs: Number(media.toFixed(2)),
    minimoMs: Number(min.toFixed(2)),
    maximoMs: Number(max.toFixed(2)),
    resultados
  };

  salvarJSON(rota, metodo, resumo);

  console.log("\n📁 Salvo em metrics.json\n");
}

function salvarJSON(rota, metodo, dados) {
  const arquivo = "metrics.json";

  let json = {};

  if (fs.existsSync(arquivo)) {
    json = JSON.parse(fs.readFileSync(arquivo, "utf-8"));
  }

  if (!json[rota]) json[rota] = {};
  if (!json[rota][metodo]) json[rota][metodo] = [];

  json[rota][metodo].push(dados);

  fs.writeFileSync(arquivo, JSON.stringify(json, null, 2));
}

const rota = "auth";
const endpoint = `http://localhost:3001/api/${rota}`;
const metodo = "GET";
const body = {
  usuario: "sette",
  senha: "1234"
};
const repeticoes = 10;

testar(endpoint, metodo, body, repeticoes, rota);
