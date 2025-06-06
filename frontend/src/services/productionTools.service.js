import api from '@/services/api'

export default {
  async getProductionTools() {
    const response = await api.get('/productionTools/')
    return response.data
  },

  async getProductionToolByNo(tool_no) {
    const response = await api.get(`/productionTools/${tool_no}`)
    return response.data
  },

  async createProductionTool(data) {
    const response = await api.post('/productionTools/create', data)
    return response.data
  },

  async updateProductionTool(tool_no, data) {
    const response = await api.put(`/productionTools/update/${tool_no}`, data)
    return response.data
  },

  async deleteProductionTool(tool_no) {
    const response = await api.delete(`/productionTools/delete/${tool_no}`)
    return response.data
  },
}
