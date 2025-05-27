// stores/vendors.js
import { defineStore } from 'pinia'
import vendorsService from '@/services/vendors.service'
import { ref } from 'vue'

export const useVendorsStore = defineStore('vendors', () => {
  const vendors = ref([])
  const currentVendor = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchVendors = async () => {
    loading.value = true
    try {
      vendors.value = await vendorsService.getVendors()
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchVendorByNo = async (vendor_no) => {
    loading.value = true
    try {
      currentVendor.value = await vendorsService.getVendorByNo(vendor_no)
    } catch (err) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const createVendor = async (data) => {
    loading.value = true
    try {
      await vendorsService.createVendor(data)
      await fetchVendors()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateVendor = async (vendor_no, data) => {
    loading.value = true
    try {
      await vendorsService.updateVendor(vendor_no, data)
      await fetchVendors()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteVendor = async (vendor_no) => {
    loading.value = true
    try {
      await vendorsService.deleteVendor(vendor_no)
      await fetchVendors()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    vendors,
    currentVendor,
    loading,
    error,
    fetchVendors,
    fetchVendorByNo,
    createVendor,
    updateVendor,
    deleteVendor,
  }
})
