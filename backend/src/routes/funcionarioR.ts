import { Router } from "express"
import { funcionarioC } from "../controllers/funcionarioC.js"

const router = Router()

router.get("/", funcionarioC.listar)
router.get("/:id", funcionarioC.buscarPorId)

router.post("/", funcionarioC.cadastrar)

export default router