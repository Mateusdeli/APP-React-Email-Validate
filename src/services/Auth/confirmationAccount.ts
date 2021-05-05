export async function sendEmailConfirmationAccount (name: string, email: string, token: string) {

  try {
    const urlValidate: any = `http://localhost:3000/account/confirmation?token=${token}`
    
    await fetch('/api/auth/register/confirmationEmail', {
      body: JSON.stringify({
        name, 
        email, 
        url: urlValidate
      }),
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    return Promise.resolve('Email enviado com sucesso, confirme em sua caixa de entrada ou cheque a caixa de span.')
  } catch (err) {
    return Promise.reject(err);
  }
}