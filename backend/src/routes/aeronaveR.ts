import { Router } from "express"
import { aeronaveC } from "../controllers/aeronaveC.js"

const router = Router()

router.get("/", aeronaveC.listar)

router.post("/", aeronaveC.cadastrar)

export default router