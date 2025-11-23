import * as bcrypt from 'bcrypt';
import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const funcionarioC = {
  async listar(req: Request, res: Response) {
    try{
      const funcionarios = await prisma.funcionario.findMany({
        omit: {
          senha: true
        },
        orderBy: { id_func: "asc" },
      });

      return res.status(200).json({
        mensagem: "Funcionários listados com sucesso",
        funcionarios
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao listar funcionários" });
    }
  },

  async buscarPorUsername(req: Request, res: Response){
    const user = req.params.user;

    try {
      const funcionario = await prisma.funcionario.findUniqueOrThrow({
        omit: {
          senha: true
        },
        where: { usuario: user }
      });

      return res.status(200).json({
        mensagem: "Funcionário encontrado com sucesso",
        funcionario
      });

    } catch (error: any) {

      if (error.code === "P2025") {
        return res.status(404).json({ erro: "Funcionário não encontrado" });
      }

      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar funcionário" });
    }
  },

  async buscarPorId(req: Request, res: Response){
    const id = Number(req.params.id);

    try {
      const funcionario = await prisma.funcionario.findUniqueOrThrow({
        omit: {
          senha: true
        },
        where: { id_func: id }
      });

      return res.status(200).json({
        mensagem: "Funcionário encontrado com sucesso",
        funcionario
      });

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

    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
      const novo = await prisma.funcionario.create({
        data: {
          nome,
          telefone,
          endereco,
          usuario,
          senha: hashedPassword,
          nivel_permissao
        }
      });

      return res.status(201).json({
        mensagem: "Funcionário cadastrado com sucesso"
      });

    } catch (error: any) {

      if (error.code === "P2002") {
        return res.status(400).json({ erro: "Usuário já existe" });
      }

      console.error("prisma error: ", error);
      return res.status(500).json({ erro: "Erro ao criar funcionário" });
    }
  },

  async excluir(req: Request, res: Response){
    const id = Number(req.params.id);

    try {
      const excluido = await prisma.funcionario.delete({
        where: { id_func: id }
      });

      return res.status(200).json({
        mensagem: "Funcionário excluído com sucesso"
      });

    } catch (error: any) {

      if (error.code === "P2025"){
        return res.status(404).json({ erro: "Funcionário não encontrado" });
      }

      console.error(error);
      return res.status(500).json({ erro: "Erro ao excluír funcionário" });
    }
  },

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { nome, telefone, endereco, usuario, senha, nivel_permissao } = req.body;

    const updateData: any = {
      nome,
      telefone,
      endereco,
      usuario,
      nivel_permissao,
    };

    if (senha && senha.trim() !== '') {
      const hashedPassword = await bcrypt.hash(senha, 10);
      updateData.senha = hashedPassword;
    }

    try {
      const funcionarioAtualizado = await prisma.funcionario.update({
        where: { id_func: id },
        data: updateData,
      });

      return res.status(200).json({
        mensagem: "Funcionário atualizado com sucesso"
      });

    } catch (error) {

      console.error("Erro ao atualizar funcionário:", error);
      return res.status(500).json({ message: "Erro ao atualizar funcionário" });
    }
  },
};