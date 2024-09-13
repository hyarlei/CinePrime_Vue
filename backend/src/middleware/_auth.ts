import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Token not found" });
  }

  const token = authorization.replace(/^Bearer\s+/i, ""); // Ajuste para remover Bearer

  console.log("Token recebido:", token); // Adicione este log para verificar o token recebido

  try {
    const decodedData = verify(token, process.env.JWT_SECRET!) as { id: number };
    req.body.userId = decodedData.id;
    return next();
  } catch (error) {
    console.error("Erro na verificação do token:", error); // Adicione este log para verificar erros
    return res.status(401).json({ message: "Invalid Token" });
  }
}
