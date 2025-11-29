import { prisma } from '../dist/prisma.js'
import bcrypt from 'bcrypt'

async function main() {
  const senhaHash = await bcrypt.hash("123", 10)

  await prisma.funcionario.upsert({
    where: { usuario: "admin" },
    update: {},
    create: {
      nome: "Administrador",
      usuario: "admin",
      senha: senhaHash,
      telefone: "000000000",
      endereco: "Sistema",
      nivel_permissao: "Administrador"
    }
  })

  console.log("\n\nAdmin criado\n\nUsuário: admin\nSenha: 123\n")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })