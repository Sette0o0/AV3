import { Router } from "express";
import { testeC } from "../controllers/testeC.js";

const router = Router()

router.post("/", testeC.cadastrar)

export default router