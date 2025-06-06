<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2Icon, MoreHorizontal } from 'lucide-vue-next'
import ProductEditModal from './ProductEditModal.vue'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const store = useProductsStore()
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedProduct = ref(null)
const productToDelete = ref(null)
const archiveFilter = ref('active')
const loading = ref(false)

const openEditModal = (product) => {
  selectedProduct.value = { ...product }
  isEditModalOpen.value = true
}

const openDeleteModal = (product) => {
  productToDelete.value = product
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (!productToDelete.value) return
  try {
    loading.value = true
    await store.deleteProduct(productToDelete.value.product_no)
    isDeleteModalOpen.value = false
    productToDelete.value = null
  } catch (error) {
    console.error('Delete failed:', error)
    alert(`Failed to delete product: ${error.response?.data?.message || error.message}`)
  } finally {
    loading.value = false
  }
}

const filteredProducts = computed(() => {
  return props.products.filter((product) => {
    if (archiveFilter.value === 'active') return !product.isArchived
    if (archiveFilter.value === 'archived') return product.isArchived
    return true
  })
})
</script>

<template>
  <div class="h-full flex flex-col space-y-4">
    <div class="flex items-center gap-4">
      <Select v-model="archiveFilter" :disabled="loading">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Products</SelectItem>
          <SelectItem value="active">Active Only</SelectItem>
          <SelectItem value="archived">Archived Only</SelectItem>
        </SelectContent>
      </Select>
      <div class="text-sm text-muted-foreground">
        Showing {{ filteredProducts.length }} of {{ store.products.length }} products
      </div>
    </div>

    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[100px]">Product No</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Description 2</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead>Unit Cost</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Vendor No</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filteredProducts.length === 0">
            <TableCell colspan="11" class="text-center py-4">No products found</TableCell>
          </TableRow>
          <TableRow v-for="product in filteredProducts" :key="product.product_no">
            <TableCell class="font-medium">{{ product.product_no || '-' }}</TableCell>
            <TableCell>{{ product.description || '-' }}</TableCell>
            <TableCell>{{ product.description2 || '-' }}</TableCell>
            <TableCell>{{ product.type || '-' }}</TableCell>
            <TableCell>{{ product.inventory || '0' }}</TableCell>
            <TableCell>{{ product.unitCost || '0.00' }}</TableCell>
            <TableCell>{{ product.unitPrice || '0.00' }}</TableCell>
            <TableCell>{{ product.vendorNo || '-' }}</TableCell>
            <TableCell>{{ product.productCategoryCode || '-' }}</TableCell>
            <TableCell>
              <Badge :variant="product.isArchived ? 'destructive' : 'default'">
                {{ product.isArchived ? 'Archived' : 'Active' }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="h-8 w-8 p-0" :disabled="loading">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openEditModal(product)">
                    <PencilIcon class="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="openDeleteModal(product)" class="text-red-500">
                    <Trash2Icon class="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <ProductEditModal
      v-model:open="isEditModalOpen"
      :product="selectedProduct"
      @saved="store.fetchProducts()"
    />

    <Dialog v-model:open="isDeleteModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            <span class="font-medium">{{ productToDelete?.description || 'this product' }}</span
            >? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="isDeleteModalOpen = false">Cancel</Button>
          <Button variant="destructive" @click="handleDelete" :disabled="loading"> Delete </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
