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

  const fetchVendorByNo = async (BIN) => {
    loading.value = true
    try {
      currentVendor.value = await vendorsService.getVendorByNo(BIN)
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

  const updateVendor = async (BIN, data) => {
    loading.value = true
    try {
      await vendorsService.updateVendor(BIN, data)
      await fetchVendors()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteVendor = async (BIN) => {
    loading.value = true
    try {
      await vendorsService.deleteVendor(BIN)
      await fetchVendors()
    } catch (err) {
      error.value = err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getVendorName = (BIN) => {
    if (!BIN) return 'Unknown Vendor'

    const vendor = vendors.value.find(
      (v) => v.BIN && v.BIN.toString().trim().toLowerCase() === BIN.toString().trim().toLowerCase(),
    )
    return vendor ? vendor.name : `Unknown Vendor (${BIN})`
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
    getVendorName,
  }
})
