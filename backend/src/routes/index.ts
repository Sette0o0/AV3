import { Router } from "express"

const router = Router()

import funcionarioR from "./funcionarioR.js"
import authR from "./authR.js"
import aeronaveR from "./aeronaveR.js"

router.use("/funcionario", funcionarioR)
router.use("/auth", authR)

router.use("/aeronave", aeronaveR)

export default router