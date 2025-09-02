import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CinePrime API',
      version: '1.0.0',
      description: 'Documentação da API do CinePrime - Sistema de Gestão de Cinemas',
      contact: {
        name: 'Equipe CinePrime',
        url: 'https://github.com/hyarlei/CinePrime_Vue',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desenvolvimento',
      },
      {
        url: 'https://cineprime-vue.onrender.com',
        description: 'Servidor de produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password', 'cpf'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID do usuário',
            },
            nome: {
              type: 'string',
              description: 'Nome do usuário',
            },
            cpf: {
              type: 'string',
              description: 'CPF do usuário',
            },
            telefone: {
              type: 'string',
              description: 'Telefone do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
            },
            isAdmin: {
              type: 'boolean',
              description: 'Indica se o usuário é administrador',
            },
            profile: {
              type: 'string',
              description: 'Perfil do usuário (adm, employee, client)',
            },
          },
        },
        Room: {
          type: 'object',
          required: ['qtd_max', 'typeExhibitionAccepted'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID da sala',
            },
            qtd_max: {
              type: 'integer',
              description: 'Quantidade máxima de pessoas na sala',
            },
            typeExhibitionAccepted: {
              type: 'string',
              description: 'Tipo de exibição aceita na sala',
            },
          },
        },
        Session: {
          type: 'object',
          required: ['dateTime', 'idRoom', 'movieTitle', 'maxTicketsQtd'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID da sessão',
            },
            dateTime: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora da sessão',
            },
            idRoom: {
              type: 'integer',
              description: 'ID da sala',
            },
            movieTitle: {
              type: 'string',
              description: 'Título do filme',
            },
            atualTicketsQtd: {
              type: 'integer',
              description: 'Quantidade atual de ingressos vendidos',
            },
            maxTicketsQtd: {
              type: 'integer',
              description: 'Quantidade máxima de ingressos disponíveis',
            },
          },
        },
        Ticket: {
          type: 'object',
          required: ['idUser', 'idSession', 'type'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID do ingresso',
            },
            idUser: {
              type: 'integer',
              description: 'ID do usuário',
            },
            idSession: {
              type: 'integer',
              description: 'ID da sessão',
            },
            type: {
              type: 'string',
              description: 'Tipo do ingresso',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Token JWT para autenticação',
                },
                id: {
                  type: 'integer',
                  description: 'ID do usuário',
                },
                nome: {
                  type: 'string',
                  description: 'Nome do usuário',
                },
                email: {
                  type: 'string',
                  description: 'E-mail do usuário',
                },
                profile: {
                  type: 'string',
                  description: 'Perfil do usuário',
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Arquivos a serem analisados em busca de anotações
};

const specs = swaggerJsdoc(options);

export default specs;
