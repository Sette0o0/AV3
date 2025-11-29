import { Router } from "express"
import { authC } from "../controllers/authC.js"

const router = Router()

router.post("/", authC.autenticar)

export default router