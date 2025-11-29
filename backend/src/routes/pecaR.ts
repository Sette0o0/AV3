import { Router } from "express";
import { pecaC } from "../controllers/pecaC.js";

const router = Router()

router.post("/", pecaC.cadastrar)
router.put("/status/:id", pecaC.atualizarStatus)

export default router