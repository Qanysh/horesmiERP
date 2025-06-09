import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { clearAuthData } from '@/utils/storage'

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
      const publicRoutes = ['/login', '/signup', '/']
      const isPublicRoute = publicRoutes.includes(router.currentRoute.value.path)

      if (!token) {
        isAuth.value = false
        user.value = null
        clearAuthData()
        return false
      }

      // For public routes, allow access without further validation
      if (isPublicRoute) {
        return true
      }

      // Validate token by attempting to fetch user role
      const role = await fetchUserRole()
      if (!role) {
        isAuth.value = false
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        clearAuthData()
        return false
      }

      isAuth.value = true
      return true
    } catch (error) {
      console.error('Check auth error:', error)
      isAuth.value = false
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      clearAuthData()
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
      clearAuthData()
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
        return response.data.role
      }
      return null
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
