import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuth = ref(!!localStorage.getItem('token'))

  const currentUser = computed(() => user.value)
  const authenticated = computed(() => isAuth.value)
  const userRole = computed(() => user.value?.role || '')

  async function checkAuth() {
    try {
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (token && storedUser) {
        user.value = JSON.parse(storedUser)
        isAuth.value = true
        return true
      }

      isAuth.value = false
      user.value = null
      return false
    } catch (error) {
      console.error('Check auth error:', error)
      isAuth.value = false
      user.value = null
      return false
    }
  }
  async function login(userData) {
    user.value = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      company: userData.company,
      role: userData.role || 'user',
    }
    isAuth.value = true
    localStorage.setItem('user', JSON.stringify(user.value))
    localStorage.setItem('token', userData.token)
  }

  async function logout() {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      user.value = null
      isAuth.value = false
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    isAuth,
    currentUser,
    authenticated,
    userRole,
    checkAuth,
    login,
    logout,
  }
})
