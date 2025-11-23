import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const funcionarioC = {
  async listar(req: Request, res: Response){
    try{
      const funcionarios = await prisma.funcionario.findMany({
        orderBy: { id_func: "asc"}
      })
      return res.status(200).json(funcionarios)
    } catch (error){
      console.error(error);
      return res.status(500).json({ erro: "Erro ao listar funcionários" });
    }
  },

  async buscarPorId(req: Request, res: Response){
    const id = Number(req.params.id)
    try {
      const funcionario = await prisma.funcionario.findUniqueOrThrow({
        where: {
          id_func: id
        }
      })

      return res.status(200).json(funcionario)
    } catch (error: any) {

      if (error.code === "P2025") {
        return res.status(404).json({ erro: "Funcionário não encontrado" });
      }
      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar funcionário" });
    }
  },

  async cadastrar(req: Request, res: Response){
    const { nome, telefone, endereco, usuario, senha, nivel_permissao } = req.body;
    try {
      const novo = await prisma.funcionario.create({
        data: {
          nome,
          telefone,
          endereco,
          usuario,
          senha,
          nivel_permissao
        }
      })

      return res.status(201).json(novo)
    } catch (error: any) {
      console.error("prisma error: ", error)

      if (error.code === "P2002") {
        return res.status(400).json({
          erro: "Usuário já existe."
        });
      }

      return res.status(500).json({ erro: "Erro ao criar funcionário." });
    }
  }
}