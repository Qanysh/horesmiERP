// useAuth.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as authService from '../services/authApi'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
  const router = useRouter()
  const authStore = useAuthStore()
  const error = ref(null)
  const isLoading = ref(false)

  const handleLogin = async (credentials) => {
    try {
      isLoading.value = true
      const data = await authService.login(credentials)
      
      if (data.validated) {
        authStore.login({
          email: credentials.email,
          ...(data.user || {})
        })
        router.push('/dashboard')
      } else {
        throw new Error('Login failed. Check your credentials and 2FA code.')
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const handleRegister = async (userData) => {
    try {
      isLoading.value = true
      if (userData.password !== userData.confirmPassword) {
        throw new Error("Passwords don't match!")
      }
      
      return await authService.register(userData)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return { error, isLoading, handleLogin, handleRegister }
}