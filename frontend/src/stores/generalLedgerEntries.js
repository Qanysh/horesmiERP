import { defineStore } from 'pinia'
import { ref } from 'vue'
import generalLedgerEntriesService from '@/services/generalLedgerEntries.service'

export const useGeneralLedgerEntriesStore = defineStore('generalLedgerEntries', () => {
  const entries = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchEntries = async (documentType = 'all') => {
    loading.value = true
    try {
      const response = await generalLedgerEntriesService.getEntries(documentType)
      entries.value = Array.isArray(response) ? response : [response]
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch entries'
      console.error('Error fetching entries:', err)
      entries.value = []
    } finally {
      loading.value = false
    }
  }

  const downloadPdf = async (documentType = 'all') => {
    try {
      loading.value = true
      const blob = await generalLedgerEntriesService.downloadPdf(documentType)
      return blob
    } catch (err) {
      console.error('Download error:', err)
      throw new Error('Failed to download PDF: ' + (err.message || 'Unknown error'))
    } finally {
      loading.value = false
    }
  }

  return {
    entries,
    loading,
    error,
    fetchEntries,
    downloadPdf,
  }
})
