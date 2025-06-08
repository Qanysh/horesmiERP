<script setup>
import { ref, watch } from 'vue'
import { useSalesOrdersStore } from '@/stores/salesOrders'
import { useCustomersStore } from '@/stores/customers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon } from 'lucide-vue-next'

const props = defineProps({
  open: Boolean,
  salesOrder: Object,
})

const emit = defineEmits(['update:open', 'saved', 'error'])
const store = useSalesOrdersStore()
const customersStore = useCustomersStore()
const errorMessage = ref('')

const form = ref({
  no: '',
  sellToCustomerNo: '',
  sellToCustomerName: '',
  postingDescription: '',
  sellToAddress: '',
  sellToCity: '',
  sellToContact: '',
  sellToPhoneNo: '',
  sellToEmail: '',
  dueDate: '',
  orderDate: '',
  status: 'Open',
  currencyCode: 'KZT',
  paymentTermsCode: '',
  paymentMethodCode: '',
  shipmentMethodCode: '',
  yourReference: '',
})

watch(
  () => props.salesOrder,
  (newVal) => {
    if (newVal) {
      form.value = {
        no: newVal.no || '',
        sellToCustomerNo: newVal.sellToCustomerNo || '',
        sellToCustomerName: newVal.sellToCustomerName || '',
        postingDescription: newVal.postingDescription || '',
        sellToAddress: newVal.sellToAddress || '',
        sellToCity: newVal.sellToCity || '',
        sellToContact: newVal.sellToContact || '',
        sellToPhoneNo: newVal.sellToPhoneNo || '',
        sellToEmail: newVal.sellToEmail || '',
        dueDate: newVal.dueDate ? new Date(newVal.dueDate).toISOString().split('T')[0] : '',
        orderDate: newVal.orderDate ? new Date(newVal.orderDate).toISOString().split('T')[0] : '',
        status: newVal.status || 'Open',
        currencyCode: newVal.currencyCode || 'KZT',
        paymentTermsCode: newVal.paymentTermsCode || '',
        paymentMethodCode: newVal.paymentMethodCode || '',
        shipmentMethodCode: newVal.shipmentMethodCode || '',
        yourReference: newVal.yourReference || '',
      }
    }
  },
  { immediate: true },
)

const handleCustomerSelect = (value) => {
  form.value.sellToCustomerNo = value
  const customer = customersStore.customers.find((c) => c.customer_no === value)
  if (customer) {
    form.value.sellToCustomerName = customer.name || ''
    form.value.sellToAddress = customer.address || ''
    form.value.sellToCity = customer.city || ''
    form.value.sellToPhoneNo = customer.phone_no || ''
    form.value.sellToEmail = customer.email || ''
  }
}

const handleSubmit = async () => {
  try {
    if (!form.value.no) {
      errorMessage.value = 'Order No is required'
      return
    }
    if (!form.value.sellToCustomerNo) {
      errorMessage.value = 'Customer is required'
      return
    }

    const data = {
      ...form.value,
      dueDate: form.value.dueDate ? `${form.value.dueDate} 19:00:00` : null,
      orderDate: form.value.orderDate ? `${form.value.orderDate} 19:00:00` : null,
      sellToAddress2: null,
      sellToCounty: null,
      sellToPostCode: null,
      sellToCountryRegionCode: null,
      sellToContactNo: null,
      sellToMobilePhoneNo: null,
      noOfArchivedVersions: null,
      documentDate: null,
      postingDate: null,
      vatReportingDate: null,
      requestedDeliveryDate: null,
      promisedDeliveryDate: null,
      externalDocumentNo: null,
      salespersonCode: null,
      campaignNo: null,
      opportunityNo: null,
      responsibilityCenter: null,
      assignedUserId: null,
      jobQueueStatus: null,
    }

    await store.updateSalesOrder(form.value.no, data)
    emit('saved')
    emit('update:open', false)
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to update sales order'
    console.error('Sales order update error:', errorMessage.value)
    emit('error', errorMessage.value)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Sales Order</DialogTitle>
        <DialogDescription>Update the sales order details below</DialogDescription>
      </DialogHeader>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="no" class="text-right font-medium">Order No</label>
          <Input id="no" v-model="form.no" class="col-span-3" required disabled />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="sellToCustomerNo" class="text-right font-medium">Customer</label>
          <Select
            v-model="form.sellToCustomerNo"
            @update:modelValue="handleCustomerSelect"
            class="col-span-3"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Customers</SelectLabel>
                <div v-if="customersStore.loading" class="flex justify-center py-2">
                  <Loader2Icon class="h-4 w-4 animate-spin" />
                </div>
                <SelectItem
                  v-else
                  v-for="customer in customersStore.customers"
                  :key="customer.customer_no"
                  :value="customer.customer_no"
                >
                  {{ customer.customer_no }} - {{ customer.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="orderDate" class="text-right font-medium">Order Date</label>
          <Input id="orderDate" v-model="form.orderDate" type="date" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="dueDate" class="text-right font-medium">Due Date</label>
          <Input id="dueDate" v-model="form.dueDate" type="date" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="postingDescription" class="text-right font-medium">Description</label>
          <Textarea id="postingDescription" v-model="form.postingDescription" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <label for="status" class="text-right font-medium">Status</label>
            <Select v-model="form.status" class="col-span-3" :disabled="false">
              <SelectTrigger class="w-full sm:w-auto">
                <SelectValue :placeholder="'Select a status'" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Released">Released</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="sellToAddress" class="text-right font-medium">Address</label>
          <Input id="sellToAddress" v-model="form.sellToAddress" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="sellToCity" class="text-right font-medium">City</label>
          <Input id="sellToCity" v-model="form.sellToCity" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="sellToPhoneNo" class="text-right font-medium">Phone</label>
          <Input id="sellToPhoneNo" v-model="form.sellToPhoneNo" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="sellToEmail" class="text-right font-medium">Email</label>
          <Input id="sellToEmail" v-model="form.sellToEmail" class="col-span-3" />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit" :disabled="customersStore.loading">Save</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
