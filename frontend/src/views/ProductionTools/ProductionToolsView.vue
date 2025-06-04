<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductionToolsStore } from '@/stores/productionTools'
import ProductionToolsTable from '@/components/productionTools/ProductionToolsTable.vue'
import ProductionToolCreateModal from '@/components/productionTools/ProductionToolCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = useProductionToolsStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredProductionTools = computed(() => {
  if (!searchQuery.value.trim()) return store.productionTools
  const query = searchQuery.value.trim().toLowerCase()
  return store.productionTools.filter((tool) => {
    return (
      (tool.name || '').toLowerCase().includes(query) ||
      (tool.description || '').toLowerCase().includes(query)
    )
  })
})

onMounted(() => {
  store.fetchProductionTools()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Production Tools</h2>
      <Button @click="isCreateModalOpen = true">
        <PlusIcon class="mr-2 h-4 w-4" />
        Add Production Tool
      </Button>
    </div>

    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        v-model="searchQuery"
        placeholder="Search by name or description..."
        class="pl-9 w-full max-w-md"
      />
    </div>

    <ProductionToolsTable :productionTools="filteredProductionTools" />
    <div class="text-sm text-muted-foreground">
      Showing {{ filteredProductionTools.length }} of {{ store.productionTools.length }} production
      tools
    </div>

    <ProductionToolCreateModal
      v-model:open="isCreateModalOpen"
      @saved="store.fetchProductionTools()"
    />
  </div>
</template>
