import { defineStore } from 'pinia'
import itemsService from '@/services/items.service'
import { ref } from 'vue'

export const useItemsStore = defineStore('items', () => {
  const items = ref([])
  const currentItem = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchItems = async () => {
    loading.value = true
    try {
      items.value = await itemsService.getItems()
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchItemByNo = async (item_no) => {
    loading.value = true
    try {
      currentItem.value = await itemsService.getItemByNo(item_no)
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const createItem = async (data) => {
    loading.value = true
    try {
      await itemsService.createItem(data)
      await fetchItems()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateItem = async (item_no, data) => {
    loading.value = true
    try {
      await itemsService.updateItem(item_no, data)
      await fetchItems()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteItem = async (item_no) => {
    loading.value = true
    try {
      await itemsService.deleteItem(item_no)
      await fetchItems()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    currentItem,
    loading,
    error,
    fetchItems,
    fetchItemByNo,
    createItem,
    updateItem,
    deleteItem,
  }
})
