import { Router } from "express"

const router = Router()

import funcionarioR from "./funcionarioR.js"

router.use("/funcionario", funcionarioR)

export default router