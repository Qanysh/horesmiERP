<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit', 'close'])

const customer = ref({
  no: '',
  name: '',
  balance: 0,
  creditLimit: 0,
  totalSales: 0,
  costs: 0,
  address: '',
  country: '',
  city: '',
  phone: '',
  email: '',
  contactName: ''
})

const handleSubmit = () => {
  emit('submit', customer.value)
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Add Customer</h2>
          <button @click="handleClose" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Customer Number</label>
            <input v-model="customer.no" type="text" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="customer.name" type="text" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Balance</label>
            <input v-model.number="customer.balance" type="number"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Credit Limit</label>
            <input v-model.number="customer.creditLimit" type="number"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <!-- Add all other fields in similar fashion -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Total Sales</label>
            <input v-model.number="customer.totalSales" type="number"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Costs</label>
            <input v-model.number="customer.costs" type="number"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <input v-model="customer.address" type="text"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Country</label>
            <input v-model="customer.country" type="text"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">City</label>
            <input v-model="customer.city" type="text"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="customer.phone" type="tel"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="customer.email" type="email"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Contact Name</label>
            <input v-model="customer.contactName" type="text"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          </div>

          <div class="flex justify-end space-x-3 md:col-span-2 pt-4">
            <button type="button" @click="handleClose"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>