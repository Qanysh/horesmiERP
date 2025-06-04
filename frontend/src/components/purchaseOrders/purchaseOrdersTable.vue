<script setup>
import { ref, onMounted, computed } from 'vue'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps({
  purchaseOrders: {
    type: Array,
    required: true,
  },
})

const store = usePurchaseOrdersStore()
const vendorsStore = useVendorsStore()
const isEditModalOpen = ref(false)
const isViewModalOpen = ref(false)
const isLineModalOpen = ref(false)
const selectedPurchaseOrder = ref(null)
const selectedPurchaseLine = ref(null)
const archiveFilter = ref('active')
const loading = ref(false)

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

const openLineEditModal = (line, order) => {
  selectedPurchaseLine.value = line ? { ...line } : null
  selectedPurchaseOrder.value = { ...order }
  isLineModalOpen.value = true
}

const handleDelete = async (no) => {
  if (confirm('Are you sure you want to archive this purchase order?')) {
    try {
      loading.value = true
      await store.deletePurchaseOrder(no)
    } catch (error) {
      console.error('Archive failed:', error)
      alert(`Failed to archive purchase order: ${error.response?.data?.message || error.message}`)
    } finally {
      loading.value = false
    }
  }
}

const handleDeleteLine = async (lineId, documentNo) => {
  if (confirm('Are you sure you want to delete this purchase line?')) {
    try {
      loading.value = true
      await store.deletePurchaseLine(lineId)
      await store.fetchPurchaseLinesByDocumentNo(documentNo)
    } catch (error) {
      console.error('Delete line failed:', error)
      alert(`Failed to delete purchase line: ${error.response?.data?.message || error.message}`)
    } finally {
      loading.value = false
    }
  }
}

const getVendorName = (vendorNo) => {
  const vendor = vendorsStore.vendors.find((v) => v.BIN === vendorNo)
  return vendor ? vendor.name : vendorNo
}

const expandedRows = ref({})

const toggleRow = async (no) => {
  expandedRows.value[no] = !expandedRows.value[no]
  if (expandedRows.value[no]) {
    await store.fetchPurchaseLinesByDocumentNo(no)
  }
}

const filteredPurchaseLines = (documentNo) => {
  return store.purchaseLinesByDocumentNo[documentNo] || []
}

const filteredPurchaseOrders = computed(() => {
  return props.purchaseOrders.filter((order) => {
    if (archiveFilter.value === 'active') return !order.isArchived
    if (archiveFilter.value === 'archived') return order.isArchived
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
          <SelectItem value="all">All Orders</SelectItem>
          <SelectItem value="active">Active Only</SelectItem>
          <SelectItem value="archived">Archived Only</SelectItem>
        </SelectContent>
      </Select>
      <div class="text-sm text-muted-foreground">
        Showing {{ filteredPurchaseOrders.length }} of {{ store.purchaseOrders.length }} purchase
        orders
      </div>
    </div>

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
            <TableHead>Archive Status</TableHead>
            <TableHead class="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filteredPurchaseOrders.length === 0">
            <TableCell colspan="9" class="text-center py-4">No purchase orders found</TableCell>
          </TableRow>
          <template v-for="order in filteredPurchaseOrders" :key="order.no">
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
              <TableCell>
                <Badge :variant="order.isArchived ? 'destructive' : 'default'">
                  {{ order.isArchived ? 'Archived' : 'Active' }}
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
                    <DropdownMenuItem @click="openViewModal(order)">
                      <EyeIcon class="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="openLineEditModal(null, order)">
                      <PlusIcon class="mr-2 h-4 w-4" />
                      Add Line
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="openEditModal(order)">
                      <PencilIcon class="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="handleDelete(order.no)" class="text-red-500">
                      <Trash2Icon class="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow v-if="expandedRows[order.no]" class="bg-gray-50 dark:bg-gray-800">
              <TableCell colspan="9">
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
                        <TableHead class="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        v-if="
                          !Array.isArray(filteredPurchaseLines(order.no)) ||
                          filteredPurchaseLines(order.no).length === 0
                        "
                      >
                        <TableCell colspan="8" class="text-center py-4">
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
                        <TableCell>
                          {{
                            line.expectedReceiptDate
                              ? new Date(line.expectedReceiptDate).toLocaleDateString()
                              : ''
                          }}
                        </TableCell>
                        <TableCell class="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                              <Button variant="ghost" class="h-8 w-8 p-0">
                                <MoreHorizontal class="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem @click="openLineEditModal(line, order)">
                                <PencilIcon class="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                @click="handleDeleteLine(line.id, order.no)"
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
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <PurchaseOrderEditModal
      v-model:open="isEditModalOpen"
      :purchase-order="selectedPurchaseOrder"
      @saved="store.fetchPurchaseOrders()"
    />
    <PurchaseLineEditModal
      v-model:open="isLineModalOpen"
      :purchase-line="selectedPurchaseLine"
      :document-no="selectedPurchaseOrder?.no"
      :buy-from-vendor-no="selectedPurchaseOrder?.vendorNo"
      @saved="
        selectedPurchaseOrder?.no && store.fetchPurchaseLinesByDocumentNo(selectedPurchaseOrder.no)
      "
      @error="(msg) => console.error('PurchaseLineEditModal error:', msg)"
    />
    <PurchaseOrderViewModal
      v-model:open="isViewModalOpen"
      :purchase-order="selectedPurchaseOrder"
    />
  </div>
</template>
