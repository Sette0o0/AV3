# 🚀 AV3 --- Sistema de Gestão

Projeto **AV3**, uma aplicação full-stack que integra:

-   Frontend em **React**
-   Backend em **Node.js + Express + prisma + typescript**

------------------------------------------------------------------------

## 📦 Pré-requisitos

Antes de rodar o projeto, instale:

-   **Node.js**

------------------------------------------------------------------------

## ▶️ Como rodar o projeto

### 🧱 Primeira vez rodando o projeto

Altere o .env na pasta backend, troque as variáveis pelas usadas no seu mySql.
Nos meus testes ele já criava o banco sozinho se ele não existia, mas se der
erro tente criar o banco antes você mesmo

Use o comando abaixo na **pasta raiz**:

``` sh
npm run dev
```

Esse comando executa automaticamente:

-   Instalação das dependências (`npm install`)
-   Geração do banco de dados via Prisma (`prisma migrate`)
-   Compilação dos arquivos TypeScript (`tsc`)
-   Execução do backend + frontend

### Usuário padrâo

O projeto começa com um usuário padrão cadastrado

Usuário: `admin`
Senha: `123`

Crie um outro admin e depois apague o padrão

------------------------------------------------------------------------

### 🔄 Executando novamente (modo rápido)

Se você **já rodou o projeto antes** e só fez pequenas alterações:

``` sh
npm run test
```

------------------------------------------------------------------------

## 📊 Métricas de Performance
Documento mais detalhado sobre as métricas na pasta docs

### ⏱️ Tempo de Resposta (ms)
![Tempo de Resposta](./docs/response.png)

### ⚙️ Tempo de Processamento (ms)
![Tempo de Processamento](./docs/processing.png)

### 📡 Latência (ms)
![Latência](./docs/latency.png)

------------------------------------------------------------------------

## 👨‍💻 Autor

# Sette0_0

Projeto **AV3** --- desenvolvido para fins acadêmicos.
