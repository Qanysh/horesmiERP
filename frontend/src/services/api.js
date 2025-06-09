import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useModalStore } from '@/stores/useModalStore'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http//185.129.51.179/api',
  withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  const authStore = useAuthStore()
  if (!authStore.isAuth && !['/auth/login', '/auth/signup'].includes(config.url)) {
    router.push('/login')
    return Promise.reject(new Error('Not authenticated'))
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const authStore = useAuthStore()

    if (status === 401) {
      authStore.logout()
      router.push('/login')
    }

    if (status === 403) {
      const modal = useModalStore()
      modal.openAccessDenied()
    }

    return Promise.reject(error)
  },
)

export default api
