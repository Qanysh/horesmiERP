import api from '@/services/api'

export default {
  async getProducts() {
    const response = await api.get('/products/')
    return response.data
  },

  async getProductByNo(product_no) {
    const response = await api.get(`/products/card/${product_no}`)
    return response.data
  },

  async createProduct(data) {
    const response = await api.post('/products/create', data)
    return response.data
  },

  async updateProduct(product_no, data) {
    const response = await api.put(`/products/update/${product_no}`, data)
    return response.data
  },

  async deleteProduct(product_no) {
    const response = await api.delete(`/products/delete/${product_no}`)
    return response.data
  },
}
