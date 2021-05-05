export const generateToken = async () => {
  try {
    const response = await fetch('/api/token/generationToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json();
    return data.token
  } catch (err) {
    return err
  }
}