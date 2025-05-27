<script setup>
import { ref, computed, onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
import ItemsTable from '@/components/items/ItemsTable.vue'
import ItemCreateModal from '@/components/items/ItemCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = useItemsStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value) return store.items
  return store.items.filter(
    (item) =>
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.description2 &&
        item.description2.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
})

onMounted(() => {
  store.fetchItems()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Items</h2>
      <Button @click="isCreateModalOpen = true">
        <PlusIcon class="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>

    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        v-model="searchQuery"
        placeholder="Search by description..."
        class="pl-9 w-full max-w-md"
      />
    </div>

    <ItemsTable :items="filteredItems" />
    <div class="text-sm text-muted-foreground">Showing {{ store.items.length }} items</div>

    <ItemCreateModal v-model:open="isCreateModalOpen" @saved="store.fetchItems()" />
  </div>
</template>
