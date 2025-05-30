import api from '@/services/api'

export default {
  async getVendors() {
    const response = await api.get('/vendors/')
    return response.data
  },

  async getVendorByNo(vendor_no) {
    const response = await api.get(`/vendors/card/${vendor_no}`)
    return response.data
  },

  async createVendor(data) {
    const response = await api.post('/vendors/create', data)
    return response.data
  },

  async updateVendor(vendor_no, data) {
    const response = await api.put(`/vendors/update/${vendor_no}`, data)
    return response.data
  },

  async deleteVendor(vendor_no) {
    const response = await api.delete(`/vendors/delete/${vendor_no}`)
    return response.data
  },
}
