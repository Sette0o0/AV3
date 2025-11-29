import { prisma } from "../prisma.js"
import { performance } from "perf_hooks"
import type { Request, Response } from "express"
import { StatusPeca } from "../generated/prisma/enums.js"

export const pecaC = {
  async cadastrar(req: Request, res: Response){
    const inicio = performance.now()
    const { nome, tipo, fornecedor, aero_id } = req.body

    const data = {
      nome,
      tipo,
      fornecedor,
      status: StatusPeca.Em_Produção,
      aero_id: Number(aero_id),
    }
    try {
      await prisma.peca.create({ data })

      const fim = performance.now();

      return res.status(201).json({
        mensagem: "Peça cadastrada com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      console.error("prisma error:", error);
      return res.status(500).json({ erro: "Erro ao criar peça" });
    }
  }
}