<script setup>
defineProps({
  vendors: {
    type: Array,
    required: true,
  },
})

import { ref } from 'vue'
import { useVendorsStore } from '@/stores/vendors'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2Icon, MoreHorizontal } from 'lucide-vue-next'
import VendorEditModal from './VendorEditModal.vue'
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

const store = useVendorsStore()
const isModalOpen = ref(false)
const selectedVendor = ref(null)

const openEditModal = (vendor) => {
  selectedVendor.value = { ...vendor }
  isModalOpen.value = true
}

const handleDelete = async (vendor_no) => {
  if (confirm('Are you sure you want to delete this vendor?')) {
    await store.deleteVendor(vendor_no)
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[100px]">Vendor No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Responsibility Center</TableHead>
            <TableHead>Location Code</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Currency Code</TableHead>
            <TableHead>Search Name</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="vendors.length === 0">
            <TableCell colspan="8" class="text-center py-4"> No vendors found </TableCell>
          </TableRow>
          <TableRow v-for="vendor in vendors" :key="vendor.vendorNo">
            <TableCell class="font-medium">{{ vendor.vendorNo }}</TableCell>
            <TableCell>{{ vendor.name }}</TableCell>
            <TableCell>{{ vendor.responsibilityCenter }}</TableCell>
            <TableCell>{{ vendor.locationCode }}</TableCell>
            <TableCell>{{ vendor.phoneNo }}</TableCell>
            <TableCell>{{ vendor.contact }}</TableCell>
            <TableCell>{{ vendor.currencyCode }}</TableCell>
            <TableCell>{{ vendor.searchName }}</TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="h-8 w-8 p-0">
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
