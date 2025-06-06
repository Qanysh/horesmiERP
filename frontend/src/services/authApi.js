const BASE_URL = 'http://localhost:3000/api/auth'

export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  return await response.json()
}

export const register = async (userData) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      company: userData.company,
      password: userData.password,
      re_password: userData.re_password,
    }),
  })
  return await response.json()
}
