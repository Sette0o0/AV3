import { Router } from "express"

const router = Router()

import funcionarioR from "./funcionarioR.js"
import authR from "./authR.js"
import aeronaveR from "./aeronaveR.js"
import pecaR from "./pecaR.js"
import etapaR from "./etapaR.js"
import testeR from "./testeR.js"

router.use("/funcionario", funcionarioR)
router.use("/auth", authR)

router.use("/aeronave", aeronaveR)
router.use("/peca", pecaR)
router.use("/etapa", etapaR)
router.use("/teste", testeR)

export default router