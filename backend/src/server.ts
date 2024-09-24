import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes/routes';
dotenv.config();

const app = express();
const PORT = process.env.VUE_BACKEND_PORT || 3333;

app.use(cors({
	origin: 'https://cine-prime-vue.vercel.app'  // Substitua pela URL real do frontend
}));

app.use(express.json());

app.use(routes);
try {
    app.listen(PORT, () => {
        console.log(`Funcionando em http://localhost:${PORT}`);
    });
} catch (error) {
    console.log(error);
}
