# :checkered_flag: CinePrime - Sistema de Gestão de Cinemas

O projeto CinePrime é uma aplicação destinada à gestão de cinemas, permitindo aos usuários realizar diversas operações relacionadas à exibição de filmes e venda de ingressos.

Para executar este projeto siga os passos descritos no arquivo [passo-a-passo](passo-a-passo.md)

## :technologist: Membros da equipe

542646, Hyarlei Silva Freitas, Sistema de Informação.
535739, Antonio Victor Cavalcante Rodrigues, Sistema de Informação.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## :spiral_calendar: Entidades ou tabelas do sistema

Liste as principais entidades do sistema.

- User
- Movie
- Session
- Room
- Ticket
- Employer

## :triangular_flag_on_post:  Principais funcionalidades da aplicação

- Cadastrar Filme: Permitir que o usuário cadastre um filme, informando o nome, o código, o gênero, a duração e a classificação indicativa.
- Listar Filmes: Exibir uma lista com todos os filmes cadastrados, incluindo o gênero e a classificação indicativa.
- Cadastrar Sessão: Permitir que o usuário cadastre uma sessão para um filme, informando o horário, a quantidade de ingressos disponíveis e o valor do ingresso.
- Listar Sessões Disponíveis: Exibir uma lista com todas as sessões disponíveis, incluindo o filme, o horário, a quantidade de ingressos disponíveis e o valor do ingresso.
- Comprar Ingresso: Permitir que o comprador selecione uma sessão e compre um ou mais ingressos para essa sessão, informando seus dados pessoais (nome, CPF, telefone e e-mail) e finalizando a compra. Ao finalizar a compra, a quantidade de ingressos disponíveis para a sessão deve ser atualizada e o ingresso deve ser adicionado à lista de ingressos do comprador.
- Visualizar Ingressos Comprados: Exibir a lista de ingressos comprados pelo comprador, incluindo o ID do ingresso, o filme, a sessão, o horário, o valor e a disponibilidade.
- Cancelar Compra: Permitir que o comprador cancele a compra de um ingresso. Ao cancelar a compra, a quantidade de ingressos disponíveis para a sessão deve ser atualizada e o ingresso deve ser removido da lista de ingressos do comprador.

----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

- VueJS v3.0, Vue-Router e Pinia.
- Axios

**Backend:**

Express e Node.js

## :shipit: Operações implementadas para cada entidade da aplicação

| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| User     |  X  |  X  |  X  |  X  |
| Movie    |  X  |  X  |  X  |  X  |
| Session  |  X  |  X  |  X  |  X  |
| Room     |  X  |  X  |  X  |  X  |
| Ticket   |  X  |  X  |  X  |  X  |
| Employer |  X  |  X  |  X  |  X  |

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | /auth |
| --- | --- |
| GET | /user |
| GET | /user/{id} |
| POST | /user |
| PUT | /user/{id} |
| DELETE | /user/{id} |
| --- | --- |
| GET | /movie |
| GET | /movie/{id} |
| POST | /movie |
| PUT | /movie/{id} |
| DELETE | /movie/{id} |
| --- | --- |
| GET | /session |
| GET | /session/{id} |
| POST | /session |
| PUT | /session/{id} |
| DELETE | /session/{id} |
| --- | --- |
| GET | /employer |
| GET | /employer/{id} |
| POST | /employer |
| PUT | /employer/{id} |
| DELETE | /employer/{id} |
| --- | --- |
| GET | /room |
| GET | /room/{id} |
| POST | /room |
| PUT | /room/{id} |
| DELETE | /room/{id} |
| --- | --- |
| GET | /ticket |
| GET | /ticket/{id} |
| POST | /ticket |
| PUT | /ticket/{id} |
| DELETE | /ticket/{id} |
