-- CreateTable
CREATE TABLE `Funcionario` (
    `id_func` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nivel_permissao` ENUM('Administrador', 'Engenheiro', 'Operador') NOT NULL,

    UNIQUE INDEX `Funcionario_usuario_key`(`usuario`),
    PRIMARY KEY (`id_func`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etapa` (
    `id_eta` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `prazo` DATETIME(3) NOT NULL,
    `status` ENUM('Pendente', 'Em_Andamento', 'Concluída') NOT NULL,
    `func_id` INTEGER NOT NULL,
    `aero_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_eta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peca` (
    `id_pec` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` ENUM('Nacional', 'Importada') NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `status` ENUM('Em_Produção', 'Em_Transporte', 'Pronta') NOT NULL,
    `aero_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_pec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teste` (
    `id_tes` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('Elétrico', 'Hidráulico', 'Aerodinâmico') NOT NULL,
    `resultado` ENUM('Aprovado', 'Reprovado') NOT NULL,
    `aero_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_tes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aeronave` (
    `id_aero` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `tipo` ENUM('Comercial', 'Militar') NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `alcance` INTEGER NOT NULL,

    UNIQUE INDEX `Aeronave_codigo_key`(`codigo`),
    PRIMARY KEY (`id_aero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FuncionariosEtapa` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FuncionariosEtapa_AB_unique`(`A`, `B`),
    INDEX `_FuncionariosEtapa_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Etapa` ADD CONSTRAINT `Etapa_aero_id_fkey` FOREIGN KEY (`aero_id`) REFERENCES `Aeronave`(`id_aero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peca` ADD CONSTRAINT `Peca_aero_id_fkey` FOREIGN KEY (`aero_id`) REFERENCES `Aeronave`(`id_aero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teste` ADD CONSTRAINT `Teste_aero_id_fkey` FOREIGN KEY (`aero_id`) REFERENCES `Aeronave`(`id_aero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FuncionariosEtapa` ADD CONSTRAINT `_FuncionariosEtapa_A_fkey` FOREIGN KEY (`A`) REFERENCES `Etapa`(`id_eta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FuncionariosEtapa` ADD CONSTRAINT `_FuncionariosEtapa_B_fkey` FOREIGN KEY (`B`) REFERENCES `Funcionario`(`id_func`) ON DELETE CASCADE ON UPDATE CASCADE;
