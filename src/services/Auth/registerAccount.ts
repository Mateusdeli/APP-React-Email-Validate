import { generateToken } from "utils/token";

export async function registerAccount(name: string, email: string, password: string) {
  try {
    const token = await generateToken()
    const response = await fetch('/api/auth/register/account', {
      headers: { 
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(
        {
          name,
          email,
          password,
          token
        })
    })
    const data = await response.json()
    console.log(data);
    
    return Promise.resolve({
      message: data.message,
      token
    })
  } catch (err) {
    Promise.reject(err);
  }
  
}