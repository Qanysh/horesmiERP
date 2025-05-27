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
      purchaseOrders.value = await purchaseOrdersService.getPurchaseOrders()
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchPurchaseOrderByNo = async (no) => {
    loading.value = true
    try {
      currentPurchaseOrder.value = await purchaseOrdersService.getPurchaseOrderByNo(no)
    } catch (err) {
      error.value = err.message || 'Unknown error'
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
      error.value = err.message || 'Unknown error'
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
      error.value = err.message || 'Unknown error'
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
      error.value = err.message || 'Unknown error'
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
      error.value = err.message || 'Unknown error'
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
      error.value = err.message || 'Unknown error'
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
      error.value = err.message || 'Unknown error'
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
      error.value = err.message || 'Unknown error'
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
