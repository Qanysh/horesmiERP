import api from '@/services/api'

export default {
  async getItems() {
    const response = await api.get('/items/')
    return response.data
  },

  async getItemByNo(item_no) {
    const response = await api.get(`/items/card/${item_no}`)
    return response.data
  },

  async createItem(data) {
    const response = await api.post('/items/create', data)
    return response.data
  },

  async updateItem(item_no, data) {
    const response = await api.put(`/items/update/${item_no}`, data)
    return response.data
  },

  async deleteItem(item_no) {
    const response = await api.delete(`/items/delete/${item_no}`)
    return response.data
  },
}
