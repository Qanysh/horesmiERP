import { useAuthStore } from '@/stores/authStore'

export const useLazyCustomersStore = async () => {
  const authStore = useAuthStore()
  if (!authStore.isAuth) return null

  const module = await import('@/stores/customers')
  return module.useCustomersStore()
}

export const useLazyAdminStore = async () => {
  const authStore = useAuthStore()
  if (!authStore.isAuth) return null

  const module = await import('@/stores/admin')
  return module.useAdminStore()
}
