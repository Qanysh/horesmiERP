<script setup>
import { ref, onMounted } from 'vue'
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

const props = defineProps(['open'])
const emit = defineEmits(['update:open', 'saved'])
const store = useSalesOrdersStore()
const customersStore = useCustomersStore()

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
  dueDate: new Date().toISOString().split('T')[0],
  orderDate: new Date().toISOString().split('T')[0],
  status: 'Open',
  currencyCode: 'RUB',
  paymentTermsCode: '',
  paymentMethodCode: '',
  shipmentMethodCode: '',
  yourReference: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  if (!form.value.no) errors.value.no = 'Order No is required'
  if (!form.value.sellToCustomerNo) errors.value.sellToCustomerNo = 'Customer is required'
  return Object.keys(errors.value).length === 0
}

const resetForm = () => {
  form.value = {
    no: '',
    sellToCustomerNo: '',
    sellToCustomerName: '',
    postingDescription: '',
    sellToAddress: '',
    sellToCity: '',
    sellToContact: '',
    sellToPhoneNo: '',
    sellToEmail: '',
    dueDate: new Date().toISOString().split('T')[0],
    orderDate: new Date().toISOString().split('T')[0],
    status: 'Open',
    currencyCode: 'RUB',
    paymentTermsCode: '',
    paymentMethodCode: '',
    shipmentMethodCode: '',
    yourReference: '',
  }
}

onMounted(async () => {
  try {
    await customersStore.fetchCustomers()
  } catch (err) {
    console.error('Failed to load customers:', err)
  }
})

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
  if (!validateForm()) return
  try {
    await store.createSalesOrder(form.value)
    emit('saved')
    emit('update:open', false)
    resetForm()
  } catch (error) {
    console.error('Error creating sales order:', error)
    errors.value.submit = 'Failed to create sales order'
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Create New Sales Order</DialogTitle>
        <DialogDescription> Fill in the sales order details below </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="no" class="text-right">Order No</label>
            <div class="col-span-3">
              <Input id="no" v-model="form.no" />
              <p v-if="errors.no" class="text-red-500 text-xs mt-1">{{ errors.no }}</p>
            </div>
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="sellToCustomerNo" class="text-right">Customer</label>
            <div class="col-span-3">
              <Select v-model="form.sellToCustomerNo" @update:modelValue="handleCustomerSelect">
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
              <p v-if="errors.sellToCustomerNo" class="text-red-500 text-xs mt-1">
                {{ errors.sellToCustomerNo }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="orderDate" class="text-right">Order Date</label>
            <Input id="orderDate" v-model="form.orderDate" type="date" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="dueDate" class="text-right">Due Date</label>
            <Input id="dueDate" v-model="form.dueDate" type="date" class="col-span-3" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="postingDescription" class="text-left">Description</label>
            <Textarea
              id="postingDescription"
              v-model="form.postingDescription"
              class="col-span-4"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="currencyCode" class="text-right">Currency</label>
            <Input id="currencyCode" v-model="form.currencyCode" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="status" class="text-right">Status</label>
            <Input id="status" v-model="form.status" class="col-span-3" disabled />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="paymentTermsCode" class="text-right">Payment Terms</label>
            <Input id="paymentTermsCode" v-model="form.paymentTermsCode" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="paymentMethodCode" class="text-right">Payment Method</label>
            <Input id="paymentMethodCode" v-model="form.paymentMethodCode" class="col-span-3" />
          </div>
        </div>
      </div>

      <div v-if="errors.submit" class="text-red-500 text-sm mb-4">{{ errors.submit }}</div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)"> Cancel </Button>
        <Button
          @click="handleSubmit"
          :disabled="Object.keys(errors).length > 0 || customersStore.loading"
        >
          Create
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
