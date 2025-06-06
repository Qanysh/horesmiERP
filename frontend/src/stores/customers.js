import { defineStore } from 'pinia'
import customersService from '@/services/customers.service'
import { ref } from 'vue'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref([])
  const currentCustomer = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchCustomers = async () => {
    loading.value = true
    try {
      customers.value = await customersService.getCustomers()
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchCustomerByNo = async (customer_no) => {
    loading.value = true
    try {
      currentCustomer.value = await customersService.getCustomerByNo(customer_no)
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const createCustomer = async (data) => {
    loading.value = true
    try {
      await customersService.createCustomer(data)
      await fetchCustomers()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCustomer = async (customer_no, data) => {
    loading.value = true
    try {
      await customersService.updateCustomer(customer_no, data)
      await fetchCustomers()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCustomer = async (customer_no) => {
    loading.value = true
    try {
      await customersService.deleteCustomer(customer_no)
      await fetchCustomers()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    customers,
    currentCustomer,
    loading,
    error,
    fetchCustomers,
    fetchCustomerByNo,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
})
