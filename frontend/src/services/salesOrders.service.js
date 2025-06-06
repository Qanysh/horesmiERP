import api from '@/services/api'

export default {
  getSalesOrders(isArchived = 0) {
    return api
      .get(`/salesOrders?isArchived=${isArchived}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales orders')
      })
  },

  getSalesOrderByNo(no) {
    return api
      .get(`/salesOrders/card/${no}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales order')
      })
  },

  createSalesOrder(data) {
    return api
      .post('/salesOrders/create', data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to create sales order')
      })
  },

  updateSalesOrder(no, data) {
    return api
      .put(`/salesOrders/update/${no}`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to update sales order')
      })
  },

  deleteSalesOrder(no) {
    return api
      .delete(`/salesOrders/delete/${no}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to delete sales order')
      })
  },

  getSalesLinesByDocumentNo(documentNo) {
    return api
      .get(`/salesLines/byDocumentNo/${documentNo}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales lines')
      })
  },

  getSalesLineById(id) {
    return api
      .get(`/salesLines/card/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales line')
      })
  },

  createSalesLine(data) {
    return api
      .post('/salesLines/create', data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to create sales line')
      })
  },

  updateSalesLine(id, data) {
    return api
      .put(`/salesLines/update/${id}`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to update sales line')
      })
  },

  deleteSalesLine(id) {
    return api
      .delete(`/salesLines/delete/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to delete sales line')
      })
  },
}
