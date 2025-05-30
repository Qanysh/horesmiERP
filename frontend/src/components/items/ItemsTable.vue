<script setup>
import { ref, computed } from 'vue'
import { useItemsStore } from '@/stores/items'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2Icon, MoreHorizontal } from 'lucide-vue-next'
import ItemEditModal from './ItemEditModal.vue'
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

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const store = useItemsStore()
const isModalOpen = ref(false)
const selectedItem = ref(null)
const archiveFilter = ref('all')
const loading = ref(false)

const openEditModal = (item) => {
  selectedItem.value = { ...item }
  isModalOpen.value = true
}

const handleDelete = async (item_no) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      loading.value = true
      await store.deleteItem(item_no)
    } catch (error) {
      console.error('Delete failed:', error)
      alert(`Failed to delete item: ${error.response?.data?.message || error.message}`)
    } finally {
      loading.value = false
    }
  }
}

const filteredItems = computed(() => {
  return props.items.filter((item) => {
    if (archiveFilter.value === 'active') return !item.isArchived
    if (archiveFilter.value === 'archived') return item.isArchived
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
          <SelectItem value="all">All Items</SelectItem>
          <SelectItem value="active">Active Only</SelectItem>
          <SelectItem value="archived">Archived Only</SelectItem>
        </SelectContent>
      </Select>
      <div class="text-sm text-muted-foreground">
        Showing {{ filteredItems.length }} of {{ store.items.length }} items
      </div>
    </div>

    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[100px]">Item No</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Description 2</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead>Unit Cost</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>BIN</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filteredItems.length === 0">
            <TableCell colspan="11" class="text-center py-4">No items found</TableCell>
          </TableRow>
          <TableRow v-for="item in filteredItems" :key="item.item_no">
            <TableCell class="font-medium">{{ item.item_no || '-' }}</TableCell>
            <TableCell>{{ item.description || '-' }}</TableCell>
            <TableCell>{{ item.description2 || '-' }}</TableCell>
            <TableCell>{{ item.type || '-' }}</TableCell>
            <TableCell>{{ item.inventory || '0' }}</TableCell>
            <TableCell>{{ item.unitCost || '0.00' }}</TableCell>
            <TableCell>{{ item.unitPrice || '0.00' }}</TableCell>
            <TableCell>{{ item.vendorNo || '-' }}</TableCell>
            <TableCell>{{ item.itemCategoryCode || '-' }}</TableCell>
            <TableCell>
              <Badge :variant="item.isArchived ? 'destructive' : 'default'">
                {{ item.isArchived ? 'Archived' : 'Active' }}
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
                  <DropdownMenuItem @click="openEditModal(item)">
                    <PencilIcon class="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="handleDelete(item.item_no)" class="text-red-500">
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

    <ItemEditModal v-model:open="isModalOpen" :item="selectedItem" @saved="store.fetchItems()" />
  </div>
</template>
