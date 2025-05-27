<script setup>
import { ref, onMounted } from 'vue'
import { usePurchaseOrdersStore } from '@/stores/purchaseOrders'
import { useVendorsStore } from '@/stores/vendors'
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
const store = usePurchaseOrdersStore()
const vendorsStore = useVendorsStore()

const form = ref({
  no: '',
  vendorNo: '',
  buyFromVendorName: '',
  postingDescription: '',
  buyFromAddress: '',
  buyFromCity: '',
  buyFromContact: '',
  buyFromContactPhoneNo: '',
  buyFromContactEmail: '',
  dueDate: new Date().toISOString().split('T')[0],
  vendorInvoiceNo: '',
  purchaserCode: '',
  orderDate: new Date().toISOString().split('T')[0],
  orderAddressCode: '',
  responsibilityCenter: '',
  assignedUserId: '',
  status: 'Open',
  languageCode: 'RU',
  currencyCode: 'RUB',
  pricesIncludingVAT: 1,
  paymentTermsCode: '',
  paymentMethodCode: '',
  shipmentMethodCode: '',
  remitToName: '',
  remitToAddress: '',
  remitToCity: '',
  remitToPostCode: '',
  remitToCountryRegionCode: 'RU',
  remitToContact: '',
})

onMounted(async () => {
  await vendorsStore.fetchVendors()
})

const handleSubmit = async () => {
  try {
    await store.createPurchaseOrder(form.value)
    emit('saved')
    emit('update:open', false)
    // Reset form
    form.value = {
      no: '',
      vendorNo: '',
      buyFromVendorName: '',
      postingDescription: '',
      buyFromAddress: '',
      buyFromCity: '',
      buyFromContact: '',
      buyFromContactPhoneNo: '',
      buyFromContactEmail: '',
      dueDate: new Date().toISOString().split('T')[0],
      vendorInvoiceNo: '',
      purchaserCode: '',
      orderDate: new Date().toISOString().split('T')[0],
      orderAddressCode: '',
      responsibilityCenter: '',
      assignedUserId: '',
      status: 'Open',
      languageCode: 'RU',
      currencyCode: 'RUB',
      pricesIncludingVAT: 1,
      paymentTermsCode: '',
      paymentMethodCode: '',
      shipmentMethodCode: '',
      remitToName: '',
      remitToAddress: '',
      remitToCity: '',
      remitToPostCode: '',
      remitToCountryRegionCode: 'RU',
      remitToContact: '',
    }
  } catch (error) {
    console.error('Error creating purchase order:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Create New Purchase Order</DialogTitle>
        <DialogDescription> Fill in the purchase order details below </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="no" class="text-right">Order No</label>
            <Input id="no" v-model="form.no" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="vendorNo" class="text-right">Vendor</label>
            <Select v-model="form.vendorNo">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select a vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vendors</SelectLabel>
                  <SelectItem
                    v-for="vendor in vendorsStore.vendors"
                    :key="vendor.vendorNo"
                    :value="vendor.vendorNo"
                  >
                    {{ vendor.vendorNo }} - {{ vendor.name }}
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
            <label for="postingDescription" class="text-right">Description</label>
            <Textarea
              id="postingDescription"
              v-model="form.postingDescription"
              class="col-span-3"
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
