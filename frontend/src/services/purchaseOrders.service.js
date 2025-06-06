import api from '@/services/api'

export default {
  async getPurchaseOrders() {
    const response = await api.get('/PurchaseHeaders')
    return response.data
  },

  async getPurchaseOrderByNo(no) {
    const response = await api.get(`/PurchaseHeaders/card/${no}`)
    return response.data
  },

  async getPurchaseLinesByDocumentNo(documentNo) {
    const response = await api.get(`/purchaseLines/byDocumentNo/${documentNo}`)
    return Array.isArray(response.data) ? response.data : [response.data]
  },

  async getPurchaseLineById(id) {
    const response = await api.get(`/purchaseLines/card/${id}`)
    return response.data
  },

  async createPurchaseOrder(data) {
    const response = await api.post('/PurchaseHeaders/create', data)
    return response.data
  },

  async updatePurchaseOrder(no, data) {
    const response = await api.put(`/PurchaseHeaders/update/${no}`, data)
    return response.data
  },

  async deletePurchaseOrder(no) {
    const response = await api.delete(`/PurchaseHeaders/delete/${no}`)
    return response.data
  },

  async createPurchaseLine(data) {
    const response = await api.post('/purchaseLines/create', data)
    return response.data
  },

  async updatePurchaseLine(id, data) {
    const response = await api.put(`/purchaseLines/update/${id}`, data)
    return response.data
  },

  async deletePurchaseLine(id) {
    const response = await api.delete(`/purchaseLines/delete/${id}`)
    return response.data
  },
}
