<h1 align="center">Cine🍿Prime - Sistema de Gestão de Cinemas</h1>

O projeto CinePrime é uma aplicação destinada à gestão de cinemas, permitindo aos usuários realizar diversas operações relacionadas à exibição de filmes e venda de ingressos. A aplicação é composta por um **frontend** desenvolvido em Vue.js e um **backend** em Node.js com Express.

## Índice

- [Membros da equipe](#membros-da-equipe)
- [Papéis de usuários](#papéis-ou-tipos-de-usuário-da-aplicação)
- [Entidades principais](#entidades-ou-tabelas-do-sistema)
- [Funcionalidades principais](#principais-funcionalidades-da-aplicação)
- [Tecnologias e frameworks utilizados](#tecnologias-e-frameworks-utilizados)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Operações implementadas](#operações-implementadas-para-cada-entidade-da-aplicação)
- [Rotas da API REST](#rotas-da-api-rest-utilizadas)
- [Deploy](#deploy)
- [Licença](#licença)

## Membros da equipe

- 542646, Hyarlei Silva Freitas, Sistema de Informação.
- 535739, Antonio Victor Cavalcante Rodrigues, Sistema de Informação.

## Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## Entidades ou tabelas do sistema

Liste as principais entidades do sistema.

- User
- Session
- Room
- Ticket
- Employer

## Principais funcionalidades da aplicação

- **Listar Filmes**: Exibir uma lista com todos os filmes, incluindo o gênero e a classificação indicativa.
- **Cadastrar Sessão**: Permitir que o usuário cadastre uma sessão para um filme, informando o horário, a quantidade de ingressos disponíveis e o valor do ingresso.
- **Listar Sessões Disponíveis**: Exibir uma lista com todas as sessões disponíveis, incluindo o filme, o horário, a quantidade de ingressos e o valor.
- **Comprar Ingresso**: Permitir que o comprador selecione uma sessão e compre ingressos informando seus dados pessoais.
- **Visualizar Ingressos Comprados**: Exibir a lista de ingressos comprados.
- **Cancelar Compra**: Permitir que o comprador cancele a compra de um ingresso.

## Tecnologias e frameworks utilizados

- **Frontend**: VueJS v3.0, Vue-Router, Axios.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, JWT.
- **Banco de Dados**: PostgreSQL.

## Estrutura do Projeto

A aplicação é dividida entre o frontend e o backend, cada um com seu próprio README e instruções específicas. Veja os detalhes completos de cada parte:

- [Frontend (Vue.js)](./frontend/README.md)
- [Backend (Node.js)](./backend/README.md)

```
├── frontend/    # Interface do usuário (Vue.js)
├── backend/     # API RESTful (Node.js e Express)
└── README.md    # Documentação principal
```

## Operações implementadas para cada entidade da aplicação

| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| User     |  X  |  X  |  X  |  X  |
| Movie    |     |  X  |     |     |
| Session  |  X  |  X  |  X  |  X  |
| Room     |  X  |  X  |  X  |  X  |
| Ticket   |  X  |  X  |  X  |  X  |
| Employer |  X  |  X  |  X  |  X  |

## Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | /auth |
| GET | /user |
| GET | /user/{id} |
| POST | /user |
| PUT | /user/{id} |
| DELETE | /user/{id} |
...

## Deploy

- **Frontend**: Para rodar o frontend, veja as instruções no [README do frontend](./frontend/README.md).
- **Backend**: Para rodar o backend, veja as instruções no [README do backend](./backend/README.md).

## Licença

Este projeto está licenciado sob os termos da licença MIT.

---

Dessa forma, o arquivo contém uma visão geral do projeto, informações importantes, e não repete muito o conteúdo dos READMEs específicos.