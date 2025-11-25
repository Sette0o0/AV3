import { Router } from "express"
import { aeronaveC } from "../controllers/aeronaveC.js"

const router = Router()

router.get("/", aeronaveC.listar)
router.get("/codigo/:codigo", aeronaveC.buscarPorCodigo)
router.get("/:id", aeronaveC.buscarPorId)

router.post("/", aeronaveC.cadastrar)

router.delete("/:id", aeronaveC.excluir)

router.put("/:id", aeronaveC.atualizar)

export default router