import { KJUR } from 'jsrsasign'
import { NextApiRequest, NextApiResponse } from "next";

export default function generationToken(req: NextApiRequest, res: NextApiResponse) {

  const key = process.env.KEY_EMAIL_VERIFICATION
  
  var header = {alg: 'HS256', typ: 'JWT'};

  let payload = {}
  let timeNow = KJUR.jws.IntDate.get('now')
  let timeExpired = KJUR.jws.IntDate.get(`${Date.now() + 10}`)
  payload.iat = timeNow;
  payload.exp = timeExpired;

  var jwtToken = KJUR.jws.JWS.sign('HS256', header, payload, key);

  if (!jwtToken) {
    res.status(500).json({
      message: 'Ocorreu um erro ao gerar o token'
    })
  }

  res.status(200).json({
    token: jwtToken,
    message: 'Token gerado com sucesso'
  })
  
}