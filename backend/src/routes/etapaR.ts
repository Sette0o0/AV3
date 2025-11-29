import { Router } from "express";
import { etapaC } from "../controllers/etapaC.js";

const router = Router()

router.post("/", etapaC.cadastrar)

router.put("/status/:id", etapaC.atualizarStatus)
router.put("/funcionarios/:id", etapaC.adicionarFuncionarios)

export default router