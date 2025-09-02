import { Router } from "express";
import {
    CreateSessionController,
    ListSessionsController,
    FindSessionByIdController,
    DeleteSessionController,
    UpdateSessionController
} from "../controllers/SessionController";

const sessionsRouter = Router();

const createSessionController = new CreateSessionController();
const listSessionController = new ListSessionsController();
const findSessionByIdController = new FindSessionByIdController();
const deleteSessionController = new DeleteSessionController();
const updateSessionController = new UpdateSessionController();

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Criar uma nova sessão
 *     tags: [Sessões]
 *     description: Cria uma nova sessão de filme
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Sessão criada com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro do servidor
 */
sessionsRouter.post("/", createSessionController.store);

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Listar todas as sessões
 *     tags: [Sessões]
 *     description: Retorna a lista de todas as sessões
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sessões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro do servidor
 */
sessionsRouter.get("/", listSessionController.index);

/**
 * @swagger
 * /session/{id}:
 *   get:
 *     summary: Obter sessão por ID
 *     tags: [Sessões]
 *     description: Retorna os detalhes de uma sessão específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão
 *     responses:
 *       200:
 *         description: Detalhes da sessão
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro do servidor
 */
sessionsRouter.get("/:id", findSessionByIdController.find);

/**
 * @swagger
 * /session/{id}:
 *   put:
 *     summary: Atualizar uma sessão
 *     tags: [Sessões]
 *     description: Atualiza os dados de uma sessão específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       200:
 *         description: Sessão atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro do servidor
 */
sessionsRouter.put("/:id", updateSessionController.update);

/**
 * @swagger
 * /session/{id}:
 *   delete:
 *     summary: Excluir uma sessão
 *     tags: [Sessões]
 *     description: Exclui uma sessão específica pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão
 *     responses:
 *       200:
 *         description: Sessão excluída com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro do servidor
 */
sessionsRouter.delete("/:id", deleteSessionController.delete);

export default sessionsRouter;
