import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ISession {
    dateTime: Date;
    movieTitle: string;
    idRoom: number;
    atualTicketsQtd: number;
    maxTicketsQtd: number;
}

export class UpdateSessionService {
    async execute({ dateTime, movieTitle, idRoom, atualTicketsQtd, maxTicketsQtd }: ISession, req: Request, res: Response) {
        const { id } = req.params;

        if (!dateTime || !movieTitle || idRoom === undefined || atualTicketsQtd === undefined || maxTicketsQtd === undefined) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        try {
            const sessionExiste = await prisma.session.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!sessionExiste) {
                return res.status(400).json({ message: 'Sessão não existe' });
            }

            const roomExists = await prisma.room.findUnique({
                where: { id: idRoom },
            });

            if (!roomExists) {
                return res.status(400).json({ message: 'Sala não existe' });
            }

            const session = await prisma.session.update({
                where: {
                    id: Number(id),
                },
                data: {
                    dateTime,
                    movieTitle,
                    idRoom,
                    atualTicketsQtd,
                    maxTicketsQtd,
                },
                include: {
                    room: true,
                },
            });

            return res.status(201).json(session);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
