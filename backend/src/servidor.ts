import express from "express";
import cors from "cors";

import api from "./routes/index.js"

const app = express();
const PORT = 3001

app.use(cors({
  // origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use("/api", api)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});