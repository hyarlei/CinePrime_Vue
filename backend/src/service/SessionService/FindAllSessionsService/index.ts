import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ListSessionsService {
    async execute(_req: Request, res: Response) {
        try {
            const sessions = await prisma.session.findMany({
                include: {
                    room: true, // Inclui informações da sala associada à sessão
                },
            });
            return res.status(200).json(sessions);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
