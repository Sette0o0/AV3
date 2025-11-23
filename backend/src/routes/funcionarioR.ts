import { Router } from "express"
import { funcionarioC } from "../controllers/funcionarioC.js"

const router = Router()

router.get("/", funcionarioC.listar)
router.get("/user/:user", funcionarioC.buscarPorUsername)
router.get("/:id", funcionarioC.buscarPorId)

router.post("/", funcionarioC.cadastrar)

router.delete("/:id", funcionarioC.excluir)

router.put("/:id", funcionarioC.atualizar)

export default router