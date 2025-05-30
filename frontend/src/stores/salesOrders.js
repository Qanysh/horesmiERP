import { defineStore } from 'pinia'
import salesOrdersService from '@/services/salesOrders.service'
import { ref } from 'vue'

export const useSalesOrdersStore = defineStore('salesOrders', () => {
  const salesOrders = ref([])
  const currentSalesOrder = ref(null)
  const salesLinesByDocumentNo = ref({})
  const loading = ref(false)
  const error = ref(null)

  const fetchSalesOrders = async () => {
    loading.value = true
    try {
      salesOrders.value = await salesOrdersService.getSalesOrders()
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchSalesOrderByNo = async (no) => {
    loading.value = true
    try {
      currentSalesOrder.value = await salesOrdersService.getSalesOrderByNo(no)
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchSalesLinesByDocumentNo = async (documentNo) => {
    loading.value = true
    try {
      const lines = await salesOrdersService.getSalesLinesByDocumentNo(documentNo)
      salesLinesByDocumentNo.value[documentNo] = lines
    } catch (err) {
      error.value = err.message || 'Unknown error'
      salesLinesByDocumentNo.value[documentNo] = []
      console.error(`Error fetching sales lines for ${documentNo}:`, err)
    } finally {
      loading.value = false
    }
  }

  const createSalesOrder = async (data) => {
    loading.value = true
    try {
      await salesOrdersService.createSalesOrder(data)
      await fetchSalesOrders()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateSalesOrder = async (no, data) => {
    loading.value = true
    try {
      await salesOrdersService.updateSalesOrder(no, data)
      await fetchSalesOrders()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteSalesOrder = async (no) => {
    loading.value = true
    try {
      await salesOrdersService.deleteSalesOrder(no)
      await fetchSalesOrders()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createSalesLine = async (data) => {
    loading.value = true
    try {
      const response = await salesOrdersService.createSalesLine(data)
      if (data.documentNo) {
        await fetchSalesLinesByDocumentNo(data.documentNo)
      }
      return response
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateSalesLine = async (id, data) => {
    loading.value = true
    try {
      const response = await salesOrdersService.updateSalesLine(id, data)
      if (data.documentNo) {
        await fetchSalesLinesByDocumentNo(data.documentNo)
      }
      return response
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteSalesLine = async (id) => {
    loading.value = true
    try {
      await salesOrdersService.deleteSalesLine(id)
      if (currentSalesOrder.value?.no) {
        await fetchSalesLinesByDocumentNo(currentSalesOrder.value.no)
      }
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    salesOrders,
    currentSalesOrder,
    salesLinesByDocumentNo,
    loading,
    error,
    fetchSalesOrders,
    fetchSalesOrderByNo,
    fetchSalesLinesByDocumentNo,
    createSalesOrder,
    updateSalesOrder,
    deleteSalesOrder,
    createSalesLine,
    updateSalesLine,
    deleteSalesLine,
  }
})
