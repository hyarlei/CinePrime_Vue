import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

import { CreateUserService } from "../service/UserService/CreateUserService";
import { DeleteUserService } from "../service/UserService/DeleteUserService";
import { ListarUsersService } from "../service/UserService/FindAllUsersService";
import { FindUserByEmailService } from "../service/UserService/FindUserByEmailService";
import { UpdateUserService } from "../service/UserService/UpdateUserService";
import { FindUserByIdService } from "../service/UserService/FindUserByIdService";

import { sign } from "jsonwebtoken";

interface IUser {
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  password: string;
}

const prisma = new PrismaClient();


// export class CreateUserController {
//   async store(req: Request, res: Response) {
//     const { nome, cpf, email, telefone, password }: IUser = req.body;

//     const createUserService = new CreateUserService();

//     const user = await createUserService.execute(
//       { email, nome, cpf, telefone, password },
//       req,
//       res
//     );

//     return user;
//   }
// }
export class CreateUserController {
  async createUser(req: Request, res: Response) {
    const { nome, cpf, telefone, email, password } = req.body;

    try {
      // Verifica se o e-mail já está em uso
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
      }

      // Cria o usuário no banco de dados
      const user = await prisma.user.create({
        data: {
          nome,
          cpf,
          telefone,
          email,
          password, // Idealmente, você deve hashear a senha
        },
      });

      // Gera o token JWT para o novo usuário
      const token = sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET!, // Certifique-se de ter uma chave secreta definida
        { expiresIn: '1h' }
      );

      // Retorna o token para o frontend
      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao cadastrar usuário.', error });
    }
  }
}

export class DeleteUserController {
  async delete(req: Request, res: Response) {

    const deleteUserService = new DeleteUserService();

    const user = await deleteUserService.execute(
      req,
      res
    );

    return user;
  }
}

export class ListarUsersController {
  async index(req: Request, res: Response) {

    const listarUserService = new ListarUsersService();

    const user = await listarUserService.execute(
      req,
      res
    );

    return user;
  }
}

export class ListarUsersEmailController {
  async listarUsers(req: Request, res: Response) {

    const { email } = req.body;

    const findUserByEmailService = new FindUserByEmailService();

    const user = await findUserByEmailService.execute(
      { email: String(email) },
      req,
      res
    );

    return user;
  }
}

export class UpdateUserController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, cpf, email, telefone, password }: IUser = req.body;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute(
      { id: Number(id), email, nome, cpf, telefone, password },
      req,
      res
    );

    return user;
  }
}

export class findUserById {
  async find(req: Request, res: Response) {
    const { id } = req.params;

    const findUserByIdService = new FindUserByIdService();

    const user = await findUserByIdService.execute(
      { id: Number(id) },
      req,
      res
    );

    return user;
  }
}