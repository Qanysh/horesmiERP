<script setup>
import { ref, computed } from 'vue'
import { useProductionToolsStore } from '@/stores/productionTools'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2Icon, MoreHorizontal } from 'lucide-vue-next'
import ProductionToolEditModal from './ProductionToolEditModal.vue'
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
  productionTools: {
    type: Array,
    required: true,
  },
})

const store = useProductionToolsStore()
const isModalOpen = ref(false)
const selectedProductionTool = ref(null)
const archiveFilter = ref('all')
const loading = ref(false)

const openEditModal = (tool) => {
  selectedProductionTool.value = { ...tool }
  isModalOpen.value = true
}

const handleDelete = async (tool_no) => {
  if (confirm('Are you sure you want to delete this production tool?')) {
    try {
      loading.value = true
      await store.deleteProductionTool(tool_no)
    } catch (error) {
      console.error('Delete failed:', error)
      alert(`Failed to delete production tool: ${error.response?.data?.message || error.message}`)
    } finally {
      loading.value = false
    }
  }
}

const filteredProductionTools = computed(() => {
  return props.productionTools.filter((tool) => {
    if (archiveFilter.value === 'active') return !tool.isArchived
    if (archiveFilter.value === 'archived') return tool.isArchived
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
          <SelectItem value="all">All Production Tools</SelectItem>
          <SelectItem value="active">Active Only</SelectItem>
          <SelectItem value="archived">Archived Only</SelectItem>
        </SelectContent>
      </Select>
      <div class="text-sm text-muted-foreground">
        Showing {{ filteredProductionTools.length }} of
        {{ store.productionTools.length }} production tools
      </div>
    </div>

    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[100px]">Tool No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filteredProductionTools.length === 0">
            <TableCell colspan="7" class="text-center py-4">No production tools found</TableCell>
          </TableRow>
          <TableRow v-for="tool in filteredProductionTools" :key="tool.tool_no">
            <TableCell class="font-medium">{{ tool.tool_no || '-' }}</TableCell>
            <TableCell>{{ tool.name || '-' }}</TableCell>
            <TableCell>{{ tool.description || '-' }}</TableCell>
            <TableCell>{{ tool.type || '-' }}</TableCell>
            <TableCell>{{ tool.locationCode || '-' }}</TableCell>
            <TableCell>
              <Badge :variant="tool.isArchived ? 'destructive' : 'default'">
                {{ tool.isArchived ? 'Archived' : tool.status || 'Active' }}
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
                  <DropdownMenuItem @click="openEditModal(tool)">
                    <PencilIcon class="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="handleDelete(tool.tool_no)" class="text-red-500">
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

    <ProductionToolEditModal
      v-model:open="isModalOpen"
      :productionTool="selectedProductionTool"
      @saved="store.fetchProductionTools()"
    />
  </div>
</template>
