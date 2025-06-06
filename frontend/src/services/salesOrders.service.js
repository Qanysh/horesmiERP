import axios from 'axios'

export default {
  getSalesOrders(isArchived = 0) {
    return axios
      .get(`http://localhost:3000/api/salesOrders?isArchived=${isArchived}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales orders')
      })
  },
  getSalesOrderByNo(no) {
    return axios
      .get(`http://localhost:3000/api/salesOrders/card/${no}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales order')
      })
  },
  createSalesOrder(data) {
    return axios
      .post('http://localhost:3000/api/salesOrders/create', data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to create sales order')
      })
  },
  updateSalesOrder(no, data) {
    return axios
      .put(`http://localhost:3000/api/salesOrders/update/${no}`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to update sales order')
      })
  },
  deleteSalesOrder(no) {
    return axios
      .delete(`http://localhost:3000/api/salesOrders/delete/${no}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to delete sales order')
      })
  },
  getSalesLinesByDocumentNo(documentNo) {
    return axios
      .get(`http://localhost:3000/api/salesLines/byDocumentNo/${documentNo}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales lines')
      })
  },
  getSalesLineById(id) {
    return axios
      .get(`http://localhost:3000/api/salesLines/card/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to fetch sales line')
      })
  },
  createSalesLine(data) {
    return axios
      .post('http://localhost:3000/api/salesLines/create', data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to create sales line')
      })
  },
  updateSalesLine(id, data) {
    return axios
      .put(`http://localhost:3000/api/salesLines/update/${id}`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to update sales line')
      })
  },
  deleteSalesLine(id) {
    return axios
      .delete(`http://localhost:3000/api/salesLines/delete/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to delete sales line')
      })
  },
}
