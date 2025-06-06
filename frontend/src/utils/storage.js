import Cookies from 'js-cookie'

const USER_KEY = 'auth_user'
const AUTH_KEY = 'isAuthenticated'

export function setAuthData(user) {
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 })
  Cookies.set(AUTH_KEY, 'true', { expires: 7 })
}

export function getUser() {
  const user = Cookies.get(USER_KEY)
  return user ? JSON.parse(user) : null
}

export function isAuthenticated() {
  return Cookies.get(AUTH_KEY) === 'true'
}

export function clearAuthData() {
  Cookies.remove(USER_KEY)
  Cookies.remove(AUTH_KEY)
}
