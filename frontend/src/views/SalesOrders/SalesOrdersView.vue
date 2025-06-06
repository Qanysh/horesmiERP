<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSalesOrdersStore } from '@/stores/salesOrders'
import SalesOrdersTable from '@/components/salesOrders/SalesOrdersTable.vue'
import SalesOrderCreateModal from '@/components/salesOrders/SalesOrderCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = useSalesOrdersStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredSalesOrders = computed(() => {
  if (!searchQuery.value.trim()) return store.salesOrders
  const query = searchQuery.value.trim().toLowerCase()
  return store.salesOrders.filter((order) => {
    return (
      (order.no || '').toLowerCase().includes(query) ||
      (order.sellToCustomerNo || '').toLowerCase().includes(query)
    )
  })
})

onMounted(() => {
  store.fetchSalesOrders()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Sales Orders</h2>
      <div class="flex gap-2">
        <Button @click="isCreateModalOpen = true">
          <PlusIcon class="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>
    </div>

    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        v-model="searchQuery"
        placeholder="Search by order no or customer..."
        class="pl-9 w-full max-w-md"
      />
    </div>

    <SalesOrdersTable :salesOrders="filteredSalesOrders" />
    <div class="text-sm text-muted-foreground">
      Showing {{ filteredSalesOrders.length }} of {{ store.salesOrders.length }} sales orders
    </div>

    <SalesOrderCreateModal v-model:open="isCreateModalOpen" @saved="store.fetchSalesOrders()" />
  </div>
</template>
