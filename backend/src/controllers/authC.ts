import * as bcrypt from "bcrypt"
import { prisma } from "../prisma.js"
import type { Request, Response } from "express"
import jwt from 'jsonwebtoken';
import "dotenv/config";

export const authC = {
  async autenticar(req: Request, res: Response){
    const inicio = performance.now();
    const { usuario, senha } = req.body;

    try {
      const user = await prisma.funcionario.findUniqueOrThrow({
        where: {
          usuario: usuario,
        },
      })

      if (!(await bcrypt.compare(senha, user.senha))){
        return res.status(401).json({ erro: "Usuário ou senha incorretos" });
      }

      const payload = {
        id: user.id_func,
        nome: user.nome,
        usuario: user.usuario,
        nivel_acesso: user.nivel_permissao,
      }
      const token = jwt.sign(payload, process.env.JWT_CODE!)
      
      const fim = performance.now();
      
      return res.status(200).json({
        mensagem: "Login realizado com sucesso",
        processingTime: (fim - inicio).toFixed(2) + " ms",
        token
      })
    } catch (error: any) {

      if (error.code === "P2025") {
        return res.status(401).json({ erro: "Usuário ou senha incorretos" });
      }

      console.error(error)
      return res.status(500).json({ erro: "Erro ao autênticar usuário" });
    }
  }
}