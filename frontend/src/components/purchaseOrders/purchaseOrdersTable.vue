<script setup>
defineProps({
  purchaseOrders: {
    type: Array,
    required: true,
  },
})

import { ref, onMounted } from 'vue'
import { usePurchaseOrdersStore } from '@/stores/purchaseOrders'
import { useVendorsStore } from '@/stores/vendors'
import { Button } from '@/components/ui/button'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  MoreHorizontal,
  EyeIcon,
} from 'lucide-vue-next'
import PurchaseOrderEditModal from './PurchaseOrderEditModal.vue'
import PurchaseOrderViewModal from './PurchaseOrderViewModal.vue'
import PurchaseLineEditModal from './PurchaseLineEditModal.vue'
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
import { Badge } from '@/components/ui/badge'

const store = usePurchaseOrdersStore()
const vendorsStore = useVendorsStore()
const isEditModalOpen = ref(false)
const isViewModalOpen = ref(false)
const selectedPurchaseOrder = ref(null)

onMounted(async () => {
  await vendorsStore.fetchVendors()
})

const openEditModal = (order) => {
  selectedPurchaseOrder.value = { ...order }
  isEditModalOpen.value = true
}

const openViewModal = (order) => {
  selectedPurchaseOrder.value = { ...order }
  isViewModalOpen.value = true
}

const handleDelete = async (no) => {
  if (confirm('Are you sure you want to delete this purchase order?')) {
    await store.deletePurchaseOrder(no)
  }
}

const getVendorName = (vendorNo) => {
  const vendor = vendorsStore.vendors.find((v) => v.vendorNo === vendorNo)
  return vendor ? vendor.name : vendorNo
}

const expandedRows = ref({})

const toggleRow = (no) => {
  expandedRows.value[no] = !expandedRows.value[no]
  if (expandedRows.value[no]) {
    store.fetchPurchaseLinesByDocumentNo(no)
  }
}

const isLineModalOpen = ref(false)
const selectedPurchaseLine = ref(null)

const openLineEditModal = (line, documentNo) => {
  selectedPurchaseLine.value = line ? { ...line } : null
  isLineModalOpen.value = true
}

const filteredPurchaseLines = (documentNo) => {
  const lines = store.purchaseLinesByDocumentNo[documentNo] || []
  return lines
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[50px]">
              <span class="sr-only">Expand</span>
            </TableHead>
            <TableHead>No</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead class="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="purchaseOrders.length === 0">
            <TableCell colspan="7" class="text-center py-4"> No purchase orders found </TableCell>
          </TableRow>
          <template v-for="order in purchaseOrders" :key="order.no">
            <TableRow>
              <TableCell>
                <Button variant="ghost" size="icon" @click="toggleRow(order.no)">
                  <ChevronRightIcon v-if="!expandedRows[order.no]" class="h-4 w-4" />
                  <ChevronDownIcon v-else class="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell class="font-medium">{{ order.no }}</TableCell>
              <TableCell>{{ getVendorName(order.vendorNo) }}</TableCell>
              <TableCell>{{ new Date(order.orderDate).toLocaleDateString() }}</TableCell>
              <TableCell>{{ new Date(order.dueDate).toLocaleDateString() }}</TableCell>
              <TableCell>
                <Badge :variant="order.status === 'Open' ? 'default' : 'secondary'">
                  {{ order.status }}
                </Badge>
              </TableCell>
              <TableCell>{{ order.totalAmount || '0.00' }}</TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="h-8 w-8 p-0">
                      <MoreHorizontal class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="openViewModal(order)">
                      <EyeIcon class="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="openLineEditModal(null, order.no)">
                      <PlusIcon class="mr-2 h-4 w-4" />
                      Add Line
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="openEditModal(order)">
                      <PencilIcon class="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="handleDelete(order.no)" class="text-red-500">
                      <Trash2Icon class="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow v-if="expandedRows[order.no]" class="bg-gray-50 dark:bg-gray-800">
              <TableCell colspan="8">
                <div class="p-4">
                  <h4 class="font-semibold mb-2">Purchase Lines</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Line No</TableHead>
                        <TableHead>Item No</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Cost</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Expected Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        v-if="
                          !Array.isArray(filteredPurchaseLines(order.no)) ||
                          filteredPurchaseLines(order.no).length === 0
                        "
                      >
                        <TableCell colspan="7" class="text-center py-4">
                          {{
                            store.loading ? 'Loading purchase lines...' : 'No purchase lines found'
                          }}
                        </TableCell>
                      </TableRow>
                      <TableRow v-for="line in filteredPurchaseLines(order.no)" :key="line.id">
                        <TableCell>{{ line.lineNo }}</TableCell>
                        <TableCell>{{ line.no }}</TableCell>
                        <TableCell>{{ line.description }}</TableCell>
                        <TableCell>{{ line.quantity }} {{ line.unitOfMeasureCode }}</TableCell>
                        <TableCell>{{ line.directUnitCost }}</TableCell>
                        <TableCell>{{ line.lineAmount }}</TableCell>
                        <TableCell>{{
                          line.expectedReceiptDate
                            ? new Date(line.expectedReceiptDate).toLocaleDateString()
                            : ''
                        }}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <PurchaseOrderEditModal
      v-model:open="isEditModalOpen"
      :purchaseOrder="selectedPurchaseOrder"
      @saved="store.fetchPurchaseOrders()"
    />

    <PurchaseLineEditModal
      v-model:open="isLineModalOpen"
      :purchase-line="selectedPurchaseLine"
      :document-no="selectedPurchaseLine?.documentNo"
      @saved="
        () => {
          if (selectedPurchaseLine?.documentNo) {
            store.fetchPurchaseLinesByDocumentNo(selectedPurchaseLine.documentNo)
          }
        }
      "
    />

    <PurchaseOrderViewModal v-model:open="isViewModalOpen" :purchaseOrder="selectedPurchaseOrder" />
  </div>
</template>
