<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVendorsStore } from '@/stores/vendors'
import VendorsTable from '@/components/vendors/VendorsTable.vue'
import VendorCreateModal from '@/components/vendors/VendorCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = useVendorsStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredVendors = computed(() => {
  if (!searchQuery.value) return store.vendors
  return store.vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (vendor.searchName &&
        vendor.searchName.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
})

onMounted(() => {
  store.fetchVendors()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Vendors</h2>
      <Button @click="isCreateModalOpen = true">
        <PlusIcon class="mr-2 h-4 w-4" />
        Add Vendor
      </Button>
    </div>

    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input v-model="searchQuery" placeholder="Search by name..." class="pl-9 w-full max-w-md" />
    </div>

    <VendorsTable :vendors="filteredVendors" />
    <div class="text-sm text-muted-foreground">Showing {{ store.vendors.length }} vendors</div>

    <VendorCreateModal v-model:open="isCreateModalOpen" @saved="store.fetchVendors()" />
  </div>
</template>
