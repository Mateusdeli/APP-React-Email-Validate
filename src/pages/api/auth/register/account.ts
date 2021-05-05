import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { UserModelProps } from "models/User";

export default async function registerAccount(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, token } = req.body
  const prisma = new PrismaClient()
  
  try {
    await prisma.account.create({
      data: {
        email: email[0],
        name: name[0],
        password: password[0],
        token: token,
        validate: false
      }
    })
    res.status(201).json({
      message: 'Usuario registrado com sucesso!'
    })
  } catch (err) {
    console.log(err);
    
    res.status(500).json({
      message: 'Houve um erro ao cadastrar o usuario'
    })
  }
}