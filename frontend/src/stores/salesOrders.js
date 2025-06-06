import { defineStore } from 'pinia'
import salesOrdersService from '@/services/salesOrders.service'
import { ref } from 'vue'

export const useSalesOrdersStore = defineStore('salesOrders', () => {
  const salesOrders = ref([])
  const currentSalesOrder = ref(null)
  const salesLinesByDocumentNo = ref({})
  const loading = ref(false)
  const error = ref(null)

  const fetchSalesOrders = async (isArchived = 0) => {
    loading.value = true
    try {
      salesOrders.value = await salesOrdersService.getSalesOrders(isArchived)
      error.value = null
    } catch (err) {
      error.value = err.message || 'Failed to fetch sales orders'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const fetchSalesOrderByNo = async (no) => {
    loading.value = true
    try {
      currentSalesOrder.value = await salesOrdersService.getSalesOrderByNo(no)
      error.value = null
    } catch (err) {
      error.value = err.message || 'Failed to fetch sales order'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const fetchSalesLinesByDocumentNo = async (documentNo) => {
    loading.value = true
    try {
      const lines = await salesOrdersService.getSalesLinesByDocumentNo(documentNo)
      const linesArray = Array.isArray(lines) ? lines : [lines].filter(Boolean)
      salesLinesByDocumentNo.value[documentNo] = linesArray
      error.value = null
    } catch (err) {
      if (err.response?.status === 404 || err.response?.data?.message.includes('No sales lines')) {
        salesLinesByDocumentNo.value[documentNo] = []
        error.value = null
      } else {
        error.value = err.message || 'Failed to fetch sales lines'
        console.error(`Error fetching sales lines for ${documentNo}:`, err)
      }
    } finally {
      loading.value = false
    }
  }

  const createSalesOrder = async (data) => {
    loading.value = true
    try {
      await salesOrdersService.createSalesOrder(data)
      await fetchSalesOrders()
      error.value = null
    } catch (err) {
      error.value = err.message || 'Failed to create sales order'
      console.error(error.value)
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
      error.value = null
    } catch (err) {
      error.value = err.message || 'Failed to update sales order'
      console.error(error.value)
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
      error.value = null
    } catch (err) {
      error.value = err.message || 'Failed to delete sales order'
      console.error(error.value)
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
      error.value = null
      return response
    } catch (err) {
      error.value = err.message || 'Failed to create sales line'
      console.error(error.value)
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
      error.value = null
      return response
    } catch (err) {
      error.value = err.message || 'Failed to update sales line'
      console.error(error.value)
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
      error.value = null
    } catch (err) {
      error.value = err.message || 'Failed to delete sales line'
      console.error(error.value)
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
