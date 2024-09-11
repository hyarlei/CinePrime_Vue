import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface ISession {
    dateTime: Date;
    idRoom: number;
    movieTitle: string;
    atualTicketsQtd: number;
    maxTicketsQtd: number;
}

export class CreateSessionService {
    async execute({ dateTime, idRoom, movieTitle, atualTicketsQtd, maxTicketsQtd }: ISession, req: Request, res: Response) {
        if (!dateTime || !movieTitle || idRoom === undefined || atualTicketsQtd === undefined || maxTicketsQtd === undefined) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        if (atualTicketsQtd > maxTicketsQtd) {
            return res.status(400).json({ message: 'Quantidade de ingressos atual não pode ser maior que a quantidade máxima' });
        }

        try {
            const roomExists = await prisma.room.findUnique({
                where: { id: idRoom },
            });

            if (!roomExists) {
                return res.status(400).json({ message: 'Sala não existe' });
            }

            const session = await prisma.session.create({
                data: {
                    dateTime,
                    idRoom,
                    movieTitle,
                    atualTicketsQtd,
                    maxTicketsQtd,
                },
            });
            return res.status(201).json(session);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
