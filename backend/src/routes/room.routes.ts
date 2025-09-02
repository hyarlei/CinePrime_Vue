import { Router } from 'express';
import { CreateRoomController, DeleteRoomController, FindRoomByIdController, ListRoomsController, UpdateRoomController } from '../controllers/RoomController';

const roomRouter = Router();

const createRoomController = new CreateRoomController();
const listRoomsController = new ListRoomsController();
const findRoomByIdController = new FindRoomByIdController();
const deleteRoomController = new DeleteRoomController();
const updateRoomController = new UpdateRoomController();

/**
 * @swagger
 * /room:
 *   post:
 *     summary: Criar uma nova sala
 *     tags: [Salas]
 *     description: Cria uma nova sala no cinema
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro do servidor
 */
roomRouter.post('/', createRoomController.store);

/**
 * @swagger
 * /room:
 *   get:
 *     summary: Listar todas as salas
 *     tags: [Salas]
 *     description: Retorna a lista de todas as salas do cinema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro do servidor
 */
roomRouter.get('/', listRoomsController.index);

/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: Obter sala por ID
 *     tags: [Salas]
 *     description: Retorna os detalhes de uma sala específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Detalhes da sala
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Sala não encontrada
 *       500:
 *         description: Erro do servidor
 */
roomRouter.get('/:id', findRoomByIdController.find);

/**
 * @swagger
 * /room/{id}:
 *   put:
 *     summary: Atualizar uma sala
 *     tags: [Salas]
 *     description: Atualiza os dados de uma sala específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Sala não encontrada
 *       500:
 *         description: Erro do servidor
 */
roomRouter.put('/:id', updateRoomController.update);

/**
 * @swagger
 * /room/{id}:
 *   delete:
 *     summary: Excluir uma sala
 *     tags: [Salas]
 *     description: Exclui uma sala específica pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Sala excluída com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Sala não encontrada
 *       500:
 *         description: Erro do servidor
 */
roomRouter.delete('/:id', deleteRoomController.delete);

export default roomRouter;
