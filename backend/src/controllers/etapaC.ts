import { prisma } from "../prisma.js"
import { performance } from "perf_hooks"
import type { Request, Response } from "express"
import { StatusEtapa } from "../generated/prisma/enums.js"

export const etapaC = {
  async cadastrar(req: Request, res: Response){
    const inicio = performance.now()
    const { nome, prazo, aero_id } = req.body

    const data = {
      nome,
      prazo: new Date(prazo),
      status: StatusEtapa.Pendente,
      aero_id: Number(aero_id),
    }
    try {
      await prisma.etapa.create({ data })

      const fim = performance.now();

      return res.status(201).json({
        mensagem: "Etapa cadastrada com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      console.error("prisma error:", error);
      return res.status(500).json({ erro: "Erro ao criar etapa" });
    }
  },

  async atualizarStatus(req: Request, res: Response){
    const inicio = performance.now()
    const id_eta = Number(req.params.id)
    const { status } = req.body
    const data = {
      status
    }
    try {
      await prisma.etapa.update({
        where: { id_eta: id_eta},
        data: data
      })

      const fim = performance.now();

      return res.status(200).json({
        mensagem: "Status da etapa atualizado com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      console.error("prisma error:", error);
      return res.status(500).json({ erro: "Erro ao atualizar status da etapa" });
    }
  },

  async adicionarFuncionarios(req: Request, res: Response){
    const inicio = performance.now()
    const id_eta = Number(req.params.id)
    const { funcionarios } = req.body
    try {
      await prisma.etapa.update({
        where: { id_eta },
        data: {
          funcionario: {
            connect: funcionarios.map((id: number) => ({ id_func: id }))
          }
        }
      })

      const fim = performance.now();

      return res.status(200).json({
        mensagem: "Funcionários adicionads na etapa com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      console.error("prisma error:", error);
      return res.status(500).json({ erro: "Erro ao adicionar funcionários na etapa" });
    }
  }
}