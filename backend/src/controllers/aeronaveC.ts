import { prisma } from "../prisma.js"
import type { Request, Response } from "express"

export const aeronaveC = {
  async listar(req: Request, res: Response){
    try {
      const aeronaves = await prisma.aeronave.findMany()

      return res.status(200).json({
        aeronaves,
        mensagem: "Aeronaves listadas com sucesso"
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao listar aeronaves" });
    }
  },

  async cadastrar(req: Request, res: Response){
    const { codigo, modelo, tipo, capacidade, alcance } = req.body
    const data = {
      codigo,
      modelo,
      tipo,
      capacidade: Number(capacidade),
      alcance: Number(alcance)
    }
    try {
      const result = await prisma.aeronave.create({
        data: data
      })

      return res.status(201).json({
        mensagem: "Aeronave cadastrada com sucesso"
      });
    } catch (error: any) {

      if (error.code === "P2002") {
        return res.status(400).json({ erro: "Aeronave já existe" });
      }

      console.error("prisma error: ", error);
      return res.status(500).json({ erro: "Erro ao criar aeronave" });
    }
  }
}