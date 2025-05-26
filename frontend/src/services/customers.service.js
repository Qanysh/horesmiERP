import api from '@/services/api'

export default {
  async getCustomers() {
    const response = await api.get('/customers/')
    return response.data
  },

  async getCustomerByNo(customer_no) {
    const response = await api.get(`/customers/card/${customer_no}`)
    return response.data
  },

  async createCustomer(data) {
    const response = await api.post('/customers/create', data)
    return response.data
  },

  async updateCustomer(customer_no, data) {
    const response = await api.put(`/customers/update/${customer_no}`, data)
    return response.data
  },

  async deleteCustomer(customer_no) {
    const response = await api.delete(`/customers/${customer_no}`)
    return response.data
  },
}
