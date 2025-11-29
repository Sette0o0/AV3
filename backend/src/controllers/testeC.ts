import { prisma } from "../prisma.js"
import { performance } from "perf_hooks"
import type { Request, Response } from "express"

export const testeC = {
  async cadastrar(req: Request, res: Response){
    const inicio = performance.now()
    const id = req.params.id
    const { tipo, resultado, aero_id } = req.body
    const data = {
      tipo,
      resultado,
      aero_id: Number(aero_id),
    }
    try {
      await prisma.teste.create({
        data
      })

      const fim = performance.now();

      return res.status(201).json({
        mensagem: "Teste cadastrado com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      console.error("prisma error:", error);
      return res.status(500).json({ erro: "Erro ao criar teste" });
    }
  }
}