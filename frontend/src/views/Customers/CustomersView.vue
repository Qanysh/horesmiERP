<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCustomersStore } from '@/stores/customers'
import { useAuthStore } from '@/stores/authStore'
import CustomersTable from '@/components/customers/CustomersTable.vue'
import CustomerCreateModal from '@/components/customers/CustomerCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const store = useCustomersStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredCustomers = computed(() => {
  if (!searchQuery.value.trim()) return store.customers
  const query = searchQuery.value.trim().toLowerCase()
  return store.customers.filter((customer) => {
    return (
      (customer.name || '').toLowerCase().includes(query) ||
      (customer.name2 || '').toLowerCase().includes(query)
    )
  })
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

    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        v-model="searchQuery"
        placeholder="Search by name or surname..."
        class="pl-9 w-full max-w-md"
      />
    </div>

    <CustomersTable :customers="filteredCustomers" />
    <div class="text-sm text-muted-foreground">
      Showing {{ filteredCustomers.length }} of {{ store.customers.length }} customers
    </div>

    <CustomerCreateModal v-model:open="isCreateModalOpen" @saved="store.fetchCustomers()" />
  </div>
</template>
