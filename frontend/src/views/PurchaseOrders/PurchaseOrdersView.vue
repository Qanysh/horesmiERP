<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePurchaseOrdersStore } from '@/stores/purchaseOrders'
import PurchaseOrdersTable from '@/components/purchaseOrders/PurchaseOrdersTable.vue'
import PurchaseOrderCreateModal from '@/components/purchaseOrders/PurchaseOrderCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = usePurchaseOrdersStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredPurchaseOrders = computed(() => {
  if (!searchQuery.value) return store.purchaseOrders
  return store.purchaseOrders.filter(
    (order) =>
      order.no.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (order.vendorNo && order.vendorNo.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
})

onMounted(() => {
  store.fetchPurchaseOrders()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Purchase Orders</h2>
      <div class="flex gap-2">
        <Button @click="isCreateModalOpen = true">
          <PlusIcon class="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>
    </div>

    <!-- Search Input -->
    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        v-model="searchQuery"
        placeholder="Search by order no or vendor..."
        class="pl-9 w-full max-w-md"
      />
    </div>

    <PurchaseOrdersTable :purchaseOrders="filteredPurchaseOrders" />
    <div class="text-sm text-muted-foreground">
      Showing {{ store.purchaseOrders.length }} purchase orders
    </div>

    <PurchaseOrderCreateModal
      v-model:open="isCreateModalOpen"
      @saved="store.fetchPurchaseOrders()"
    />
  </div>
</template>
