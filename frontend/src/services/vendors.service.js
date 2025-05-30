import api from '@/services/api'

export default {
  async getVendors() {
    const response = await api.get('/vendors/')
    return response.data
  },

  async getVendorByNo(BIN) {
    const response = await api.get(`/vendors/card/${BIN}`)
    return response.data
  },

  async createVendor(data) {
    const response = await api.post('/vendors/create', data)
    return response.data
  },

  async updateVendor(BIN, data) {
    const response = await api.put(`/vendors/update/${BIN}`, data)
    return response.data
  },

  async deleteVendor(BIN) {
    const response = await api.delete(`/vendors/delete/${BIN}`)
    return response.data
  },
}
