<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductsTable from '@/components/products/ProductsTable.vue'
import ProductCreateModal from '@/components/products/ProductCreateModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = useProductsStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return store.products
  const query = searchQuery.value.trim().toLowerCase()
  return store.products.filter((product) => {
    return (
      (product.description || '').toLowerCase().includes(query) ||
      (product.description2 || '').toLowerCase().includes(query) ||
      (product.searchDescription || '').toLowerCase().includes(query)
    )
  })
})

onMounted(() => {
  store.fetchProducts()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Products</h2>
      <Button @click="isCreateModalOpen = true">
        <PlusIcon class="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>

    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        v-model="searchQuery"
        placeholder="Search by description, description 2, or search description..."
        class="pl-9 w-full max-w-md"
      />
    </div>

    <ProductsTable :products="filteredProducts" />
    <div class="text-sm text-muted-foreground">
      Showing {{ filteredProducts.length }} of {{ store.products.length }} products
    </div>

    <ProductCreateModal v-model:open="isCreateModalOpen" @saved="store.fetchProducts()" />
  </div>
</template>
