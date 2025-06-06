import api from '@/services/api'

const API_URL = '/products'

const getProducts = async () => {
  try {
    const response = await api.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Failed to fetch products')
  }
}

const getProductByNo = async (product_no) => {
  try {
    const response = await api.get(`${API_URL}/${product_no}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Failed to fetch product')
  }
}

const createProduct = async (data) => {
  try {
    const response = await api.post(`${API_URL}/create`, data)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Failed to create product')
  }
}

const updateProduct = async (product_no, data) => {
  try {
    const response = await api.put(`${API_URL}/update/${product_no}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Failed to update product')
  }
}

const deleteProduct = async (product_no) => {
  try {
    const response = await api.delete(`${API_URL}/delete/${product_no}`)
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Failed to delete product')
  }
}

export default {
  getProducts,
  getProductByNo,
  createProduct,
  updateProduct,
  deleteProduct,
}
