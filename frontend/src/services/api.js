import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
    }

    if (status === 403) {
      alert('Access denied. Insufficient role.')
    }

    return Promise.reject(error)
  },
)

export default api
