<script setup>
defineProps({
  customers: {
    type: Array,
    required: true,
  },
})

import { ref } from 'vue'
import { useCustomersStore } from '@/stores/customers'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2Icon, MoreHorizontal } from 'lucide-vue-next'
import CustomerEditModal from './CustomerEditModal.vue'
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

const store = useCustomersStore()
const isModalOpen = ref(false)
const selectedCustomer = ref(null)

const openEditModal = (customer) => {
  selectedCustomer.value = { ...customer }
  isModalOpen.value = true
}

const handleDelete = async (customer_no) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    await store.deleteCustomer(customer_no)
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[100px]">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Responsibility Center</TableHead>
            <TableHead>Location Code</TableHead>
            <TableHead>Country Region Code</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Salesperson Code</TableHead>
            <TableHead>Credit Limit</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="customers.length === 0">
            <TableCell colspan="11" class="text-center py-4"> No customers found </TableCell>
          </TableRow>
          <TableRow v-for="customer in customers" :key="customer.customer_no">
            <TableCell class="font-medium">{{ customer.customer_no }}</TableCell>
            <TableCell class="font-medium">{{ customer.name }}</TableCell>
            <TableCell class="font-medium">{{ customer.name2 }}</TableCell>
            <TableCell class="font-medium">{{ customer.responsibility_center }}</TableCell>
            <TableCell class="font-medium">{{ customer.location_code }}</TableCell>
            <TableCell class="font-medium">{{ customer.country_region_code }}</TableCell>
            <TableCell class="font-medium">{{ customer.contact }}</TableCell>
            <TableCell class="font-medium">{{ customer.salesperson_code }}</TableCell>
            <TableCell class="font-medium">{{ customer.credit_limit_lcy }}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {{ customer.credit_limit_lcy }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="h-8 w-8 p-0">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openEditModal(customer)">
                    <PencilIcon class="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    @click="handleDelete(customer.customer_no)"
                    class="text-red-500"
                  >
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

    <!-- Pagination would go here -->

    <CustomerEditModal
      v-model:open="isModalOpen"
      :customer="selectedCustomer"
      @saved="store.fetchCustomers()"
    />
  </div>
</template>
