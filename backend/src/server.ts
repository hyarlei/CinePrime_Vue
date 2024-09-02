import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes/routes';
dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json());
app.use(cors());

app.use(routes);
try {
    app.listen(port, () => {
        console.log(`Funcionando em http://localhost:${port}`);
    });
} catch (error) {
    console.log(error);
}
