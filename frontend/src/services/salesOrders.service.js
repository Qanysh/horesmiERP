import axios from 'axios'

export default {
  getSalesOrders() {
    return axios.get('http://localhost:3000/api/salesOrders').then((res) => res.data)
  },
  getSalesOrderByNo(no) {
    return axios.get(`http://localhost:3000/api/salesOrders/card/${no}`).then((res) => res.data)
  },
  createSalesOrder(data) {
    return axios.post('http://localhost:3000/api/salesOrders/create', data)
  },
  updateSalesOrder(no, data) {
    return axios.put(`http://localhost:3000/api/salesOrders/update/${no}`, data)
  },
  deleteSalesOrder(no) {
    return axios.delete(`http://localhost:3000/api/salesOrders/delete/${no}`)
  },
  getSalesLinesByDocumentNo(documentNo) {
    return axios
      .get(`http://localhost:3000/api/salesLines/byDocumentNo/${documentNo}`)
      .then((res) => res.data)
  },
  getSalesLineById(id) {
    return axios.get(`http://localhost:3000/api/salesLines/card/${id}`).then((res) => res.data)
  },
  createSalesLine(data) {
    return axios.post('http://localhost:3000/api/salesLines/create', data)
  },
  updateSalesLine(id, data) {
    return axios.put(`http://localhost:3000/api/salesLines/update/${id}`, data)
  },
  deleteSalesLine(id) {
    return axios.delete(`http://localhost:3000/api/salesLines/delete/${id}`)
  },
}
