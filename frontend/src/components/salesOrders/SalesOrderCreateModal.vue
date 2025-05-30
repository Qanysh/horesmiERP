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

onMounted(async () => {
  await customersStore.fetchCustomers()
})

const handleSubmit = async () => {
  try {
    await store.createSalesOrder(form.value)
    emit('saved')
    emit('update:open', false)
    // Reset form
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
  } catch (error) {
    console.error('Error creating sales order:', error)
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
            <Input id="no" v-model="form.no" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="sellToCustomerNo" class="text-right">Customer</label>
            <Select v-model="form.sellToCustomerNo">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Customers</SelectLabel>
                  <SelectItem
                    v-for="customer in customersStore.customers"
                    :key="customer.customerNo"
                    :value="customer.customerNo"
                  >
                    {{ customer.customerNo }} - {{ customer.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)"> Cancel </Button>
        <Button @click="handleSubmit"> Create </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
