import { Router } from "express";

export const routes = Router();

//Login
import _auth from "../middleware/_auth";

import authRouter from './auth.routes';
import employeeRouter from "./employee.routes";
import roomsRouter from "./room.routes";
import sessionsRouter from "./session.routes";
import ticketRouter from "./ticket.routes";
import userRouter from './user.routes';

// Rotas User
routes.use('/user', userRouter);

// Rotas de autenticação
routes.use("/auth", authRouter);

routes.use(_auth); // Autenticação obrigatória para rotas daqui para abaixo.

//Rotas Rooms
routes.use('/room', roomsRouter);

//Rotas Funcionários
routes.use('/employee', employeeRouter);

// rotas session
routes.use("/session", sessionsRouter);

//rotas ticket
routes.use("/ticket", ticketRouter);
