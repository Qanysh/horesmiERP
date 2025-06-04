import { defineStore } from 'pinia'
import purchaseOrdersService from '@/services/purchaseOrders.service'
import { ref } from 'vue'

export const usePurchaseOrdersStore = defineStore('purchaseOrders', () => {
  const purchaseOrders = ref([])
  const currentPurchaseOrder = ref(null)
  const purchaseLinesByDocumentNo = ref({})
  const loading = ref(false)
  const error = ref(null)

  const fetchPurchaseOrders = async () => {
    loading.value = true
    try {
      const orders = await purchaseOrdersService.getPurchaseOrders()
      purchaseOrders.value = orders
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to fetch purchase orders'
      console.error('Error fetching purchase orders:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchPurchaseOrderByNo = async (no) => {
    loading.value = true
    try {
      const order = await purchaseOrdersService.getPurchaseOrderByNo(no)
      if (order.isArchived) {
        throw new Error('Purchase order is archived')
      }
      currentPurchaseOrder.value = order
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to fetch purchase order'
      console.error('Error fetching purchase order:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchPurchaseLinesByDocumentNo = async (documentNo) => {
    loading.value = true
    try {
      const lines = await purchaseOrdersService.getPurchaseLinesByDocumentNo(documentNo)
      purchaseLinesByDocumentNo.value[documentNo] = lines
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to fetch purchase lines'
      purchaseLinesByDocumentNo.value[documentNo] = []
      console.error(`Error fetching purchase lines for ${documentNo}:`, err)
    } finally {
      loading.value = false
    }
  }

  const createPurchaseOrder = async (data) => {
    loading.value = true
    try {
      await purchaseOrdersService.createPurchaseOrder(data)
      await fetchPurchaseOrders()
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to create purchase order'
      console.error('Error creating purchase order:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePurchaseOrder = async (no, data) => {
    loading.value = true
    try {
      await purchaseOrdersService.updatePurchaseOrder(no, data)
      await fetchPurchaseOrders()
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to update purchase order'
      console.error('Error updating purchase order:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePurchaseOrder = async (no) => {
    loading.value = true
    try {
      await purchaseOrdersService.deletePurchaseOrder(no)
      await fetchPurchaseOrders()
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to archive purchase order'
      console.error('Error deleting purchase order:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createPurchaseLine = async (data) => {
    loading.value = true
    try {
      const response = await purchaseOrdersService.createPurchaseLine(data)
      if (data.documentNo) {
        await fetchPurchaseLinesByDocumentNo(data.documentNo)
      }
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to create purchase line'
      console.error('Error creating purchase line:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePurchaseLine = async (id, data) => {
    loading.value = true
    try {
      const response = await purchaseOrdersService.updatePurchaseLine(id, data)
      if (data.documentNo) {
        await fetchPurchaseLinesByDocumentNo(data.documentNo)
      }
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to update purchase line'
      console.error('Error updating purchase line:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePurchaseLine = async (id) => {
    loading.value = true
    try {
      await purchaseOrdersService.deletePurchaseLine(id)
      if (currentPurchaseOrder.value?.no) {
        await fetchPurchaseLinesByDocumentNo(currentPurchaseOrder.value.no)
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to delete purchase line'
      console.error('Error deleting purchase line:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    purchaseOrders,
    currentPurchaseOrder,
    purchaseLinesByDocumentNo,
    loading,
    error,
    fetchPurchaseOrders,
    fetchPurchaseOrderByNo,
    fetchPurchaseLinesByDocumentNo,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    createPurchaseLine,
    updatePurchaseLine,
    deletePurchaseLine,
  }
})
