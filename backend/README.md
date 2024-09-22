<h1 align="center">Cine🍿Prime - Backend</h1>

Bem-vindo ao repositório do **backend** da aplicação CinePrime. Aqui você encontrará as informações necessárias para configurar e rodar o ambiente de desenvolvimento da aplicação.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Rodando o servidor](#rodando-o-servidor)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Licença](#licença)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/en/) - Versão 14 ou superior
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) - Gerenciador de pacotes
- [Git](https://git-scm.com) - Controle de versão

## Instalação

Siga os passos abaixo para instalar e configurar o projeto na sua máquina local:

```bash
git clone https://github.com/hyarlei/CinePrime_Vue.git
```

Já no arquivo raiz do projeto, acesse o diretório do backend:

```bash
cd .\backend\
```

## Configuração

Instale todas as dependências necessárias com o gerenciador de pacotes de sua preferência (npm ou yarn):

```bash
npm install
```

ou

```bash
yarn install
```

## Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis de ambiente:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
```

**Nota:** Renomeie o arquivo `.env.example` para `.env` e configure as variáveis conforme necessário.

## Cadastro de Administrador

A aplicação possui um único administrador definido pelo CPF. O primeiro usuário criado no sistema, que corresponde ao valor armazenado na variável de ambiente CPF_CINEMA_OWNER, será o administrador. Todos os outros usuários terão permissões limitadas. Certifique-se de definir corretamente o CPF do administrador no arquivo .env.

## Executar Migrações

Para configurar o banco de dados e criar as tabelas necessárias, execute as migrações:

```bash
npx prisma migrate dev
```

ou

```bash
yarn prisma migrate dev
```

## Instruções para Respostas Durante a Migração

"Enter a name for the new migration": Dê um nome descritivo para a migração, como inicial ou setup-tabelas.

"Would you like to apply this migration? (y/n)": Responda y para aplicar as migrações.

"Do you want to create the database? (y/n)": Responda y se o banco de dados ainda não existir.
Após essas respostas, o Prisma configurará o banco de dados e as tabelas estarão prontas.

## Rodando o servidor

Agora, inicie o servidor da aplicação com o comando:

```bash
npm run server
```

ou

```bash
yarn server
```

A aplicação estará disponível em: **[http://localhost:3333](http://localhost:3333)**

## Estrutura do Projeto

Abaixo, uma visão geral da estrutura de diretórios da aplicação:

```
├── prisma/                   # Arquivos de esquema do banco e migrações.
├── src/                      # Código fonte principal
│   ├── controllers/          # Lógica dos controladores
│   ├── middleware/           # Middleware da aplicação
│   ├── routes/               # Configuração de rotas
│   ├── service/              # Serviços da aplicação
│   └── server.js             # Ponto de entrada do servidor
└── package.json              # Arquivo de dependências e scripts
```

## Visão Geral

CinePrime é uma aplicação de gerenciamento de cinema que permite aos funcionários controlar salas de cinema, sessões de filmes e ingressos. O administrador tem acesso a todas as funcionalidades, enquanto os usuários podem visualizar filmes e realizar compras de ingressos.

## Funcionalidades Principais

- Cadastro e gerenciamento de sessões de cinema
- Listagem de sessões disponíveis e detalhes dos filmes
- Cadastro de usuários (clientes, funcionários e administradores)
- Compra e gerenciamento de ingressos
- Autenticação e autorização de usuários com JWT

## Tecnologias Utilizadas

O backend da CinePrime foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js** e **Express**: Para o desenvolvimento da API
- **TypeScript**: Para tipagem estática e desenvolvimento mais seguro
- **Prisma ORM**: Para manipulação e integração com o banco de dados
- **PostgreSQL**: Banco de dados relacional utilizado no projeto
- **JWT (JSON Web Token)**: Para autenticação e autorização de usuários

## Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para clonar e modificar conforme necessário.
