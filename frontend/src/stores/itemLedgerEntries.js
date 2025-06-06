import { defineStore } from 'pinia'
import axios from 'axios'

export const useItemLedgerEntriesStore = defineStore('itemLedgerEntries', {
  state: () => ({
    itemLedgerEntries: [],
    loading: false,
  }),

  actions: {
    async fetchItemLedgerEntries() {
      try {
        this.loading = true
        const response = await axios.get('http://localhost:3000/api/itemLedgerEntries')
        this.itemLedgerEntries = response.data
      } catch (error) {
        console.error('Error fetching item ledger entries:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchItemLedgerEntryByNo(entryNo) {
      try {
        this.loading = true
        const response = await axios.get(`http://localhost:3000/api/itemLedgerEntries/${entryNo}`)
        return response.data
      } catch (error) {
        console.error(`Error fetching item ledger entry ${entryNo}:`, error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
