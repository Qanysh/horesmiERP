<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLazyCustomersStore } from '@/stores/lazyStores'
import { useAuthStore } from '@/stores/authStore'
import CustomersTable from '@/components/customers/CustomersTable.vue'
import CustomerCreateModal from '@/components/customers/CustomerCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const store = ref(null)
const isCreateModalOpen = ref(false)
const searchQuery = ref('')
const isLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    if (!authStore.isAuth) {
      router.push('/login')
      return
    }

    isLoading.value = true
    store.value = await useLazyCustomersStore()

    if (store.value) {
      await store.value.fetchCustomers()
    }
  } catch (err) {
    error.value = err.message || 'Failed to load customers'
    console.error('Error loading customers:', err)
  } finally {
    isLoading.value = false
  }
})

const filteredCustomers = computed(() => {
  if (!store.value || !store.value.customers) return []
  if (!searchQuery.value.trim()) return store.value.customers

  const query = searchQuery.value.trim().toLowerCase()
  return store.value.customers.filter((customer) => {
    return (
      (customer.name || '').toLowerCase().includes(query) ||
      (customer.name2 || '').toLowerCase().includes(query)
    )
  })
})
</script>

<template>
  <div v-if="store" class="space-y-6">
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
