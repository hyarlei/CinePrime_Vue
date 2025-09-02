import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes/routes';
import swaggerSpecs from './swagger';

dotenv.config();

const app = express();

// Configuração do CORS
if (process.env.NODE_ENV === 'development') {
  // Em ambiente de desenvolvimento, permitimos todas as origens
  app.use(cors());
} else {
  // Em produção, apenas as origens específicas
  const allowedOrigins = [
    'https://cine-prime-vue.vercel.app',
    'http://localhost:8080'
  ];

  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    credentials: true
  }));
}

app.use(express.json());

// Configurar o Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
}));

// Endpoint para obter a especificação do Swagger em formato JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

// Rotas da API
app.use(routes);
const PORT = process.env.BACKEND_PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

