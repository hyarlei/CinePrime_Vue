import { Router } from 'express';
import { AuthController } from '../controllers/LoginController';

const authController = new AuthController();

const routesAuth = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Autenticação]
 *     description: Autentica um usuário com e-mail e senha e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos ou usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routesAuth.post('/', authController.execute);

export default routesAuth;
