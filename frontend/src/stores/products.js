import { defineStore } from 'pinia'
import productsService from '@/services/products.service'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const currentProduct = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      products.value = await productsService.getProducts()
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to fetch products'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const fetchProductByNo = async (product_no) => {
    loading.value = true
    try {
      currentProduct.value = await productsService.getProductByNo(product_no)
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to fetch product'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (data) => {
    loading.value = true
    try {
      await productsService.createProduct(data)
      await fetchProducts()
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to create product'
      console.error(error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (product_no, data) => {
    loading.value = true
    try {
      await productsService.updateProduct(product_no, data)
      await fetchProducts()
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to update product'
      console.error(error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (product_no) => {
    loading.value = true
    try {
      await productsService.deleteProduct(product_no)
      await fetchProducts()
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Failed to delete product'
      console.error(error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    currentProduct,
    loading,
    error,
    fetchProducts,
    fetchProductByNo,
    createProduct,
    updateProduct,
    deleteProduct,
  }
})
