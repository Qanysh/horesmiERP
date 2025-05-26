<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCustomersStore } from '@/stores/customers'
import CustomersTable from '@/components/customers/CustomersTable.vue'
import CustomerCreateModal from '@/components/customers/CustomerCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = useCustomersStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

// Computed property for filtered customers
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return store.customers
  return store.customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (customer.name2 && customer.name2.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
})

onMounted(() => {
  store.fetchCustomers()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Customers</h2>
      <Button @click="isCreateModalOpen = true">
        <PlusIcon class="mr-2 h-4 w-4" />
        Add Customer
      </Button>
    </div>

    <!-- Search Input -->
    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input v-model="searchQuery" placeholder="Search by name..." class="pl-9 w-full max-w-md" />
    </div>

    <CustomersTable :customers="filteredCustomers" />

    <CustomerCreateModal v-model:open="isCreateModalOpen" @saved="store.fetchCustomers()" />
  </div>
</template>
