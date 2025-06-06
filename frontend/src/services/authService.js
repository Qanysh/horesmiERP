import { login as apiLogin, register as apiRegister } from '@/services/authApi'

const authService = {
  async signup(userData) {
    try {
      const response = await apiRegister(userData)
      if (response.success) {
        localStorage.setItem('isAuthenticated', 'true')
      }
      return response
    } catch (error) {
      throw new Error('Signup failed')
    }
  },

  async login(credentials) {
    try {
      const response = await apiLogin(credentials)
      if (response.validated) {
        localStorage.setItem('isAuthenticated', 'true')
      }
      return response
    } catch (error) {
      throw new Error('Login failed')
    }
  },

  logout() {
    localStorage.removeItem('isAuthenticated')
  },

  isAuthenticated() {
    return !!localStorage.getItem('isAuthenticated')
  },
}

export default authService
