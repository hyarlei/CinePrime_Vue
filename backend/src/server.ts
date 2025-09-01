import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes/routes';
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

app.use(routes);
const PORT = process.env.BACKEND_PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

