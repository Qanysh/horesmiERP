<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useSalesOrdersStore } from '@/stores/salesOrders'
import { useCustomersStore } from '@/stores/customers'
import { Button } from '@/components/ui/button'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  MoreHorizontal,
  EyeIcon,
  Loader2Icon,
} from 'lucide-vue-next'
import SalesOrderEditModal from './SalesOrderEditModal.vue'
import SalesOrderViewModal from './SalesOrderViewModal.vue'
import SalesLineEditModal from './SalesLineEditModal.vue'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const props = defineProps({
  salesOrders: {
    type: Array,
    required: true,
  },
})

const store = useSalesOrdersStore()
const customersStore = useCustomersStore()
const isEditModalOpen = ref(false)
const isViewModalOpen = ref(false)
const isLineModalOpen = ref(false)
const isDeleteOrderModalOpen = ref(false)
const isDeleteLineModalOpen = ref(false)
const selectedSalesOrder = ref(null)
const selectedSalesLine = ref(null)
const orderToDelete = ref(null)
const lineToDelete = ref(null)
const archiveFilter = ref('active')
const loading = ref(false)

onMounted(async () => {
  try {
    await customersStore.fetchCustomers()
  } catch (err) {
    console.error('Failed to load customers:', err)
  }
})

const openEditModal = (order) => {
  selectedSalesOrder.value = { ...order }
  isEditModalOpen.value = true
}

const openViewModal = (order) => {
  selectedSalesOrder.value = { ...order }
  isViewModalOpen.value = true
}

const openLineEditModal = (line, documentNo) => {
  selectedSalesLine.value = line ? { ...line, documentNo } : { documentNo }
  isLineModalOpen.value = true
}

const openDeleteOrderModal = (order) => {
  orderToDelete.value = order
  isDeleteOrderModalOpen.value = true
}

const openDeleteLineModal = (line, order) => {
  lineToDelete.value = { line, documentNo: order.no }
  isDeleteLineModalOpen.value = true
}

const handleDeleteOrder = async () => {
  if (!orderToDelete.value) return
  try {
    loading.value = true
    await store.deleteSalesOrder(orderToDelete.value.no)
    await store.fetchSalesOrders()
    isDeleteOrderModalOpen.value = false
    orderToDelete.value = null
  } catch (err) {
    console.error('Failed to archive sales order:', err)
    alert(`Failed to archive sales order: ${err.response?.data?.message || err.message}`)
  } finally {
    loading.value = false
  }
}

const handleDeleteLine = async () => {
  if (!lineToDelete.value) return
  try {
    loading.value = true
    await store.deleteSalesLine(lineToDelete.value.line.id)
    await store.fetchSalesLinesByDocumentNo(lineToDelete.value.documentNo)
    isDeleteLineModalOpen.value = false
    lineToDelete.value = null
  } catch (error) {
    console.error('Delete line failed:', error)
    alert(`Failed to delete sales line: ${error.response?.data?.message || error.message}`)
  } finally {
    loading.value = false
  }
}

const getCustomerName = (customerNo) => {
  const customer = customersStore.customers.find((c) => c.customer_no === customerNo)
  return customer ? customer.name : customerNo
}

const expandedRows = ref({})

const toggleRow = async (no) => {
  expandedRows.value[no] = !expandedRows.value[no]
  if (expandedRows.value[no]) {
    await store.fetchSalesLinesByDocumentNo(no)
    console.log('Fetched lines for', no, store.salesLinesByDocumentNo[no])
  }
}

const filteredSalesLines = (documentNo) => {
  const lines = store.salesLinesByDocumentNo[documentNo] || []
  console.log('Rendering lines for', documentNo, lines)
  return lines
}

const filteredSalesOrders = computed(() => {
  return props.salesOrders.filter((order) => {
    if (archiveFilter.value === 'active') return !order.isArchived
    if (archiveFilter.value === 'archived') return order.isArchived
    return true
  })
})

watch(
  () => store.salesLinesByDocumentNo,
  () => {
    console.log('Sales lines updated:', store.salesLinesByDocumentNo)
  },
  { deep: true },
)
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
        Showing {{ filteredSalesOrders.length }} of {{ store.salesOrders.length }} sales orders
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
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Archive Status</TableHead>
            <TableHead class="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filteredSalesOrders.length === 0">
            <TableCell colspan="9" class="text-center py-4">
              {{ store.loading ? 'Loading sales orders...' : 'No sales orders found' }}
            </TableCell>
          </TableRow>
          <template v-for="order in filteredSalesOrders" :key="order.no">
            <TableRow>
              <TableCell>
                <Button variant="ghost" size="icon" @click="toggleRow(order.no)">
                  <ChevronRightIcon v-if="!expandedRows[order.no]" class="h-4 w-4" />
                  <ChevronDownIcon v-else class="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell class="font-medium">{{ order.no }}</TableCell>
              <TableCell>{{ getCustomerName(order.sellToCustomerNo) }}</TableCell>
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
                    <DropdownMenuItem @click="openLineEditModal(null, order.no)">
                      <PlusIcon class="mr-2 h-4 w-4" />
                      Add Line
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="openEditModal(order)">
                      <PencilIcon class="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="openDeleteOrderModal(order)" class="text-red-500">
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
                  <h4 class="font-semibold mb-2">Sales Lines</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Line No</TableHead>
                        <TableHead>Item No</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Shipment Date</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        v-if="
                          !Array.isArray(filteredSalesLines(order.no)) ||
                          filteredSalesLines(order.no).length === 0
                        "
                      >
                        <TableCell colspan="8" class="text-center py-4">
                          {{ store.loading ? 'Loading sales lines...' : 'No sales lines found' }}
                        </TableCell>
                      </TableRow>
                      <TableRow v-for="line in filteredSalesLines(order.no)" :key="line.id">
                        <TableCell>{{ line.lineNo }}</TableCell>
                        <TableCell>{{ line.no }}</TableCell>
                        <TableCell>{{ line.description }}</TableCell>
                        <TableCell>{{ line.quantity }} {{ line.unitOfMeasureCode }}</TableCell>
                        <TableCell>{{ line.unitPrice }}</TableCell>
                        <TableCell>{{ line.lineAmount }}</TableCell>
                        <TableCell>{{
                          line.shipmentDate ? new Date(line.shipmentDate).toLocaleDateString() : ''
                        }}</TableCell>
                        <TableCell class="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                              <Button variant="ghost" class="h-8 w-8 p-0">
                                <MoreHorizontal class="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem @click="openLineEditModal(line, order.no)">
                                <PencilIcon class="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                @click="openDeleteLineModal(line, order)"
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

    <SalesOrderEditModal
      v-model:open="isEditModalOpen"
      :salesOrder="selectedSalesOrder"
      @saved="store.fetchSalesOrders()"
    />
    <SalesLineEditModal
      v-model:open="isLineModalOpen"
      :sales-line="selectedSalesLine"
      :document-no="selectedSalesLine?.documentNo"
      @saved="
        () => {
          if (selectedSalesLine?.documentNo) {
            store.fetchSalesLinesByDocumentNo(selectedSalesLine.documentNo)
            expandedRows[selectedSalesLine.documentNo] = true
          }
        }
      "
    />
    <SalesOrderViewModal v-model:open="isViewModalOpen" :salesOrder="selectedSalesOrder" />

    <Dialog v-model:open="isDeleteOrderModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Archive Sales Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to archive
            <span class="font-medium">{{ orderToDelete?.no || 'this sales order' }}</span
            >? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="isDeleteOrderModalOpen = false">Cancel</Button>
          <Button variant="destructive" @click="handleDeleteOrder" :disabled="loading">
            Archive
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="isDeleteLineModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Sales Line</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the sales line for
            <span class="font-medium">{{ lineToDelete?.line.description || 'this item' }}</span
            >? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="isDeleteLineModalOpen = false">Cancel</Button>
          <Button variant="destructive" @click="handleDeleteLine" :disabled="loading">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
