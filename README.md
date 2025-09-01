# CinePrime - Aplicação de Gestão de Cinemas

## Sobre o Projeto

O CinePrime é uma aplicação web completa para gestão de cinemas, permitindo que usuários visualizem filmes disponíveis, comprem ingressos e que administradores gerenciem salas, sessões e funcionários.

![Vue](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

## Estrutura do Projeto

Este projeto segue uma arquitetura cliente-servidor, onde:

- **Frontend**: Desenvolvido com Vue.js
- **Backend**: API REST desenvolvida com Express.js e TypeScript

### Estrutura de Diretórios

```
CinePrime_Vue/
├── backend/            # API REST em Express.js
│   ├── prisma/         # ORM Prisma (modelos e migrações)
│   └── src/            # Código fonte do backend
│       ├── controllers/   # Controladores da API
│       ├── middleware/    # Middlewares (autenticação, etc.)
│       ├── routes/        # Rotas da API
│       └── service/       # Serviços para lógica de negócios
│
└── frontend/           # Aplicação Vue.js
    ├── public/         # Arquivos públicos
    └── src/            # Código fonte do frontend
        ├── api/        # Configuração de clientes HTTP
        ├── assets/     # Recursos estáticos
        ├── components/ # Componentes Vue reutilizáveis
        ├── pages/      # Páginas Vue
        ├── routes/     # Configuração de rotas
        ├── service/    # Serviços para comunicação com API
        └── store/      # Gerenciamento de estado global (Vuex)
```

## Funcionalidades

### Para Usuários Comuns

- Visualizar lista de filmes disponíveis
- Ver detalhes de filmes específicos
- Comprar ingressos para sessões
- Ver histórico de compras

### Para Administradores

- Gerenciar salas de cinema
- Configurar sessões de filmes
- Gerenciar funcionários
- Visualizar todas as transações

## Tecnologias Utilizadas

### Frontend
- Vue.js 3
- Vuex para gerenciamento de estado
- Vue Router para navegação
- Axios para requisições HTTP

### Backend
- Node.js com Express
- TypeScript para tipagem segura
- Prisma ORM para acesso ao banco de dados
- JWT para autenticação

## Como Executar o Projeto

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn
- SQLite (já configurado no projeto)

### Configuração do Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

### Configuração do Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run serve
   ```

5. Acesse a aplicação em: `http://localhost:8080`

## Deployment

O projeto está configurado para deploy na seguinte infraestrutura:
- **Backend**: [Render](https://render.com)
- **Frontend**: [Vercel](https://vercel.com)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
