import { defineStore } from 'pinia'
import adminService from '@/services/admin.service'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const users = ref([])
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    try {
      users.value = await adminService.getUsers()
    } catch (err) {
      error.value = err.message || 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  const fetchUserById = async (id) => {
    loading.value = true
    try {
      currentUser.value = await adminService.getUserById(id)
    } catch (err) {
      error.value = err.message || 'Failed to fetch user'
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, data) => {
    loading.value = true
    try {
      await adminService.updateUser(id, data)
      await fetchUsers()
    } catch (err) {
      error.value = err.message || 'Failed to update user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id) => {
    loading.value = true
    try {
      await adminService.deleteUser(id)
      await fetchUsers()
    } catch (err) {
      error.value = err.message || 'Failed to delete user'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    currentUser,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
  }
})
