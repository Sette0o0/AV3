import { Router } from "express";
import { pecaC } from "../controllers/pecaC.js";

const router = Router()

router.post("/", pecaC.cadastrar)

export default router