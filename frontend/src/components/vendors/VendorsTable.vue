<script setup>
import { ref, computed } from 'vue'
import { useVendorsStore } from '@/stores/vendors'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2Icon, MoreHorizontal } from 'lucide-vue-next'
import VendorEditModal from './VendorEditModal.vue'
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
  vendors: {
    type: Array,
    required: true,
  },
})

const store = useVendorsStore()
const isModalOpen = ref(false)
const selectedVendor = ref(null)
const archiveFilter = ref('all')
const loading = ref(false)

const openEditModal = (vendor) => {
  selectedVendor.value = { ...vendor }
  isModalOpen.value = true
}

const handleDelete = async (BIN) => {
  if (confirm('Are you sure you want to delete this vendor?')) {
    try {
      loading.value = true
      await store.deleteVendor(BIN)
    } catch (error) {
      console.error('Delete failed:', error)
      alert(`Failed to delete vendor: ${error.response?.data?.message || error.message}`)
    } finally {
      loading.value = false
    }
  }
}

const filteredVendors = computed(() => {
  return props.vendors.filter((vendor) => {
    if (archiveFilter.value === 'active') return !vendor.isArchived
    if (archiveFilter.value === 'archived') return vendor.isArchived
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
          <SelectItem value="all">All Vendors</SelectItem>
          <SelectItem value="active">Active Only</SelectItem>
          <SelectItem value="archived">Archived Only</SelectItem>
        </SelectContent>
      </Select>
      <div class="text-sm text-muted-foreground">
        Showing {{ filteredVendors.length }} of {{ store.vendors.length }} vendors
      </div>
    </div>

    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[100px]">Vendor BIN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Responsibility Center</TableHead>
            <TableHead>Location Code</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Currency Code</TableHead>
            <TableHead>Search Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filteredVendors.length === 0">
            <TableCell colspan="10" class="text-center py-4">No vendors found</TableCell>
          </TableRow>
          <TableRow v-for="vendor in filteredVendors" :key="vendor.BIN">
            <TableCell class="font-medium">{{ vendor.BIN || '-' }}</TableCell>
            <TableCell>{{ vendor.name || '-' }}</TableCell>
            <TableCell>{{ vendor.responsibilityCenter || '-' }}</TableCell>
            <TableCell>{{ vendor.locationCode || '-' }}</TableCell>
            <TableCell>{{ vendor.phoneNo || '-' }}</TableCell>
            <TableCell>{{ vendor.contact || '-' }}</TableCell>
            <TableCell>{{ vendor.currencyCode || '-' }}</TableCell>
            <TableCell>{{ vendor.searchName || '-' }}</TableCell>
            <TableCell>
              <Badge :variant="vendor.isArchived ? 'destructive' : 'default'">
                {{ vendor.isArchived ? 'Archived' : 'Active' }}
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
                  <DropdownMenuItem @click="openEditModal(vendor)">
                    <PencilIcon class="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="handleDelete(vendor.vendorNo)" class="text-red-500">
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

    <VendorEditModal
      v-model:open="isModalOpen"
      :vendor="selectedVendor"
      @saved="store.fetchVendors()"
    />
  </div>
</template>
