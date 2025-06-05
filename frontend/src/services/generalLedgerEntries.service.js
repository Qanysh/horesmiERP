import api from '@/services/api'

export default {
  async getEntries(documentType = 'all') {
    const response = await api.get('/generalLedgerEntries', {
      params: { documentType },
    })
    return response.data
  },

  async downloadPdf(documentType = 'all') {
    let url = '/reports/generalLedgerEntries'

    if (documentType === 'purchase') {
      url = '/reports/generalLedgerEntries/purchases'
    } else if (documentType === 'sale') {
      url = '/reports/generalLedgerEntries/sales'
    }

    const response = await api.get(url, { responseType: 'blob' })
    return response.data
  },
}
