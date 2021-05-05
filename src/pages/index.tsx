import { Alert } from "components/Alert"
import { FormEvent, useCallback, useState } from "react"
import { sendEmailConfirmationAccount } from "services/Auth/confirmationAccount"
import { registerAccount } from "services/Auth/registerAccount"

interface RegisterFormFieldsProps {
  name: string;
  email: string;
  password: string;
} 

export default function Home() {
  const [fields, setFields] = useState({} as RegisterFormFieldsProps)
  const [message, setMessage] = useState({
    message: '',
    hasMessage: false
  })
  
  const handleOnChange = useCallback((evt: any) => {
    setFields(prev => {
      return {...prev, [evt.target.name]: [evt.target.value]}
    })
  }, [fields])

  const handleOnSubmit = useCallback(async (evt: FormEvent) => {
    evt.preventDefault()
    try {
      const registerData = await registerAccount(fields.name, fields.email, fields.password)
      setMessage({
        hasMessage: true,
        message: registerData?.message
      })
      const confirmationEmailMessage = await sendEmailConfirmationAccount(fields.name, fields.email, registerData?.token)
      setMessage({
        hasMessage: true,
        message: confirmationEmailMessage
      })
    } catch (error) {
      setMessage({
        message: error,
        hasMessage: true        
      })
    }
  }, [fields])

  return (
    <>
      {message.hasMessage && <Alert type="success" message={message.message} />}
      <form method="post" onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleOnChange} value={fields.name || ''} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleOnChange} value={fields.email || ''}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handleOnChange} value={fields.password || ''}/>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </>
  )
}
