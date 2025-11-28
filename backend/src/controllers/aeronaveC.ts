import { prisma } from "../prisma.js"
import { performance } from "perf_hooks"
import type { Request, Response } from "express"

export const aeronaveC = {

  async listar(req: Request, res: Response) {
    const inicio = performance.now();

    try {
      const aeronaves = await prisma.aeronave.findMany();

      const fim = performance.now();

      return res.status(200).json({
        aeronaves,
        mensagem: "Aeronaves listadas com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao listar aeronaves" });
    }
  },

  async buscarPorCodigo(req: Request, res: Response) {
    const inicio = performance.now();
    const codigo = req.params.codigo;

    try {
      const aeronave = await prisma.aeronave.findUniqueOrThrow({
        where: { codigo }
      });

      const fim = performance.now();

      return res.status(200).json({
        mensagem: "Aeronave encontrada com sucesso",
        aeronave,
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      if (error.code === "P2025") {
        return res.status(404).json({ erro: "Aeronave não encontrada" });
      }

      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar aeronave" });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    const inicio = performance.now();
    const id = Number(req.params.id);

    try {
      const aeronave = await prisma.aeronave.findUniqueOrThrow({
        where: { id_aero: id }
      });

      const fim = performance.now();

      return res.status(200).json({
        mensagem: "Aeronave encontrada com sucesso",
        aeronave,
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      if (error.code === "P2025") {
        return res.status(404).json({ erro: "Aeronave não encontrada" });
      }

      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar aeronave" });
    }
  },

  async cadastrar(req: Request, res: Response) {
    const inicio = performance.now();

    const { codigo, modelo, tipo, capacidade, alcance } = req.body;

    const data = {
      codigo,
      modelo,
      tipo,
      capacidade: Number(capacidade),
      alcance: Number(alcance)
    };

    try {
      await prisma.aeronave.create({ data });

      const fim = performance.now();

      return res.status(201).json({
        mensagem: "Aeronave cadastrada com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      if (error.code === "P2002") {
        return res.status(400).json({ erro: "Aeronave já existe" });
      }

      console.error("prisma error:", error);
      return res.status(500).json({ erro: "Erro ao criar aeronave" });
    }
  },

  async excluir(req: Request, res: Response) {
    const inicio = performance.now();
    const id = Number(req.params.id);

    try {
      await prisma.aeronave.delete({
        where: { id_aero: id }
      });

      const fim = performance.now();

      return res.status(200).json({
        mensagem: "Aeronave excluída com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {

      if (error.code === "P2025") {
        return res.status(404).json({ erro: "Aeronave não encontrada" });
      }

      console.error(error);
      return res.status(500).json({ erro: "Erro ao excluír aeronave" });
    }
  },

  async atualizar(req: Request, res: Response) {
    const inicio = performance.now();

    const id = Number(req.params.id);
    const { codigo, modelo, tipo, capacidade, alcance } = req.body;

    const updateData = {
      codigo,
      modelo,
      tipo,
      capacidade: Number(capacidade),
      alcance: Number(alcance)
    };

    try {
      await prisma.aeronave.update({
        where: { id_aero: id },
        data: updateData
      });

      const fim = performance.now();

      return res.status(200).json({
        mensagem: "Aeronave atualizada com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms"
      });

    } catch (error: any) {
      console.error("Erro ao atualizar aeronave:", error);
      return res.status(500).json({ message: "Erro ao atualizar aeronave" });
    }
  }
};
