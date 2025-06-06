import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref(JSON.parse(localStorage.getItem('user') || null))
  const isAuth = ref(!!localStorage.getItem('token'))

  const currentUser = computed(() => user.value)
  const authenticated = computed(() => isAuth.value)

  async function checkAuth() {
    try {
      if (localStorage.getItem('token')) {
        isAuth.value = true
        return true
      }
      return false
    } catch (error) {
      logout()
      return false
    }
  }

  async function login(userData) {
    user.value = userData
    isAuth.value = true
    localStorage.setItem('user', JSON.stringify(userData))
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
    checkAuth,
    login,
    logout,
  }
})
