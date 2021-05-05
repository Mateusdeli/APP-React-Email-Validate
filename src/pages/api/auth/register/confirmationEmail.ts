import { UserModelProps } from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface DomainInfoProps {
  name: string;
  email: string;
}

const domain: DomainInfoProps = {
  email: process.env.EMAIL_FROM,
  name: 'Equipe World'
}

const transport = new SMTPTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})
const templateEmail = (name: string, url: string) => {
  return `
  <h3>Olá ${name},</h3>
  <p>Clique no link abaixo para confirmar o cadastro em nosso sistema.</p>
  <p>Att, ${domain.name}</p>
  <p><a href="${url}">${url}</a></p>
`}

export default async function confirmationEmail (req: NextApiRequest, res: NextApiResponse) {
  const { email, name, url } = req.body

  let transporter = nodemailer.createTransport(transport)
  try {
    await transporter.sendMail({
      from: domain.email,
      to: email,
      subject: `Confirmação de Conta - ${domain.name}`,
      html: templateEmail(name, url),
    }) 
    res.status(200).json({
      message: 'E-email enviado com sucesso!'
    })
  } catch(err) {
    res.send(err)
  }
}