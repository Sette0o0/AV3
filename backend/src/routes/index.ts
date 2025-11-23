import { Router } from "express"

const router = Router()

import funcionarioR from "./funcionarioR.js"
import authR from "./authR.js"

router.use("/funcionario", funcionarioR)
router.use("/auth", authR)

export default router