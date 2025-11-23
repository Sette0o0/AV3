import { Router } from "express"
import { authC } from "../controllers/authC.js"

const router = Router()

router.get("/", authC.autenticar)

export default router