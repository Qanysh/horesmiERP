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
      if (!token) {
        isAuth.value = false
        user.value = null
        return false
      }

      const role = await fetchUserRole()
      if (role) {
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

  async function fetchUserRole() {
    try {
      const response = await api.get('/admin/users/role')
      if (response.data.role) {
        user.value.role = response.data.role
        localStorage.setItem('user', JSON.stringify(user.value))
      }
      return response.data.role
    } catch (error) {
      console.error('Failed to fetch user role:', error)
      return null
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
    fetchUserRole,
  }
})
