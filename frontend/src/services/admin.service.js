import api from '@/services/api'

export default {
  async getUsers() {
    const response = await api.get('/admin/users')
    return response.data
  },

  async getUserById(id) {
    const response = await api.get(`/admin/users/${id}`)
    return response.data
  },

  async updateUser(id, data) {
    const response = await api.patch(`/admin/users/update/${id}`, data)
    return response.data
  },

  async deleteUser(id) {
    const response = await api.delete(`/admin/users/delete/${id}`)
    return response.data
  },
}
