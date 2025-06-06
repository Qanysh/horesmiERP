import { defineStore } from 'pinia'
import productionToolsService from '@/services/productionTools.service'
import { ref } from 'vue'

export const useProductionToolsStore = defineStore('productionTools', () => {
  const productionTools = ref([])
  const currentProductionTool = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchProductionTools = async () => {
    loading.value = true
    try {
      productionTools.value = await productionToolsService.getProductionTools()
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchProductionToolByNo = async (tool_no) => {
    loading.value = true
    try {
      currentProductionTool.value = await productionToolsService.getProductionToolByNo(tool_no)
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const createProductionTool = async (data) => {
    loading.value = true
    try {
      await productionToolsService.createProductionTool(data)
      await fetchProductionTools()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProductionTool = async (tool_no, data) => {
    loading.value = true
    try {
      await productionToolsService.updateProductionTool(tool_no, data)
      await fetchProductionTools()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProductionTool = async (tool_no) => {
    loading.value = true
    try {
      await productionToolsService.deleteProductionTool(tool_no)
      await fetchProductionTools()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    productionTools,
    currentProductionTool,
    loading,
    error,
    fetchProductionTools,
    fetchProductionToolByNo,
    createProductionTool,
    updateProductionTool,
    deleteProductionTool,
  }
})
