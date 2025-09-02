import { Router } from "express";
import {CreateTicketController,DeleteTicketController,FindTicketByIdController,ListTicketsController,UpdateTicketController} from "../controllers/TicketController";

const ticketRouter = Router();

const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();
const findTicketByIdController = new FindTicketByIdController();
const deleteTicketController = new DeleteTicketController();
const updateTicketController = new UpdateTicketController();

/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Criar um novo ingresso
 *     tags: [Ingressos]
 *     description: Cria um novo ingresso para uma sessão
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ingresso criado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro do servidor
 */
ticketRouter.post("/", createTicketController.store);

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Listar todos os ingressos
 *     tags: [Ingressos]
 *     description: Retorna a lista de todos os ingressos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ingressos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro do servidor
 */
ticketRouter.get("/", listTicketsController.index);

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Obter ingresso por ID
 *     tags: [Ingressos]
 *     description: Retorna os detalhes de um ingresso específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingresso
 *     responses:
 *       200:
 *         description: Detalhes do ingresso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Ingresso não encontrado
 *       500:
 *         description: Erro do servidor
 */
ticketRouter.get("/:id", findTicketByIdController.find);

/**
 * @swagger
 * /ticket/{id}:
 *   put:
 *     summary: Atualizar um ingresso
 *     tags: [Ingressos]
 *     description: Atualiza os dados de um ingresso específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingresso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Ingresso atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Ingresso não encontrado
 *       500:
 *         description: Erro do servidor
 */
ticketRouter.put("/:id", updateTicketController.update);

/**
 * @swagger
 * /ticket/{id}:
 *   delete:
 *     summary: Excluir um ingresso
 *     tags: [Ingressos]
 *     description: Exclui um ingresso específico pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingresso
 *     responses:
 *       200:
 *         description: Ingresso excluído com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Ingresso não encontrado
 *       500:
 *         description: Erro do servidor
 */
ticketRouter.delete("/:id", deleteTicketController.delete);

export default ticketRouter;
