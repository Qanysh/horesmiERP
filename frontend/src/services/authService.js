import { login as apiLogin, register as apiRegister } from '@/services/authApi'
import { useAuthStore } from '@/stores/authStore'

const authService = {
  async signup(userData) {
    try {
      const response = await apiRegister(userData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Signup failed')
    }
  },

  async login(credentials) {
    try {
      const response = await apiLogin(credentials)
      const authStore = useAuthStore()

      authStore.login({
        ...response.user,
        token: response.token,
      })

      await authStore.fetchUserRole()

      return response
    } catch (error) {
      throw new Error(error.message || 'Login failed')
    }
  },
}

export default authService
