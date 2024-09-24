import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes/routes';
dotenv.config();

const app = express();


app.use(cors({
	origin: 'https://cine-prime-vue.vercel.app',
	methods: 'GET,POST,PUT,DELETE,OPTIONS',
  	credentials: true
}));

app.use(express.json());

app.use(routes);
const PORT = process.env.BACKEND_PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

