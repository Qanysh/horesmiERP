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
const errorMessage = ref(null)

const form = ref({
  no: '',
  vendorNo: '',
  buyFromVendorName: '',
  postingDescription: '',
  buyFromAddress: '',
  buyFromCity: '',
  buyFromCounty: '',
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
  jobQueueStatus: 'Pending',
  languageCode: 'KZ',
  currencyCode: 'KZT',
  pricesIncludingVAT: 1,
  vatBusPostingGroup: 'VAT-KZ',
  vendorPostingGroup: 'VPG-01',
  paymentTermsCode: '',
  paymentMethodCode: '',
  shipmentMethodCode: '',
  remitToName: '',
  remitToAddress: '',
  remitToCity: '',
  remitToPostCode: '',
  remitToCountryRegionCode: 'KZ',
  remitToContact: '',
  transactionSpecification: '',
  transactionType: '',
  transportMethod: '',
  entryPoint: '',
  area: '',
})

onMounted(async () => {
  await vendorsStore.fetchVendors()
})

const handleSubmit = async () => {
  try {
    if (!form.value.no) {
      errorMessage.value = 'Order No is required'
      return
    }
    if (!form.value.vendorNo) {
      errorMessage.value = 'Vendor is required'
      return
    }
    if (!form.value.orderDate || !form.value.dueDate) {
      errorMessage.value = 'Order Date and Due Date are required'
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (form.value.buyFromContactEmail && !emailRegex.test(form.value.buyFromContactEmail)) {
      errorMessage.value = 'Invalid email format'
      return
    }

    const formattedData = {
      ...form.value,
      orderDate: `${form.value.orderDate} 19:00:00`,
      dueDate: `${form.value.dueDate} 19:00:00`,
    }

    await store.createPurchaseOrder(formattedData)
    emit('saved')
    emit('update:open', false)
    errorMessage.value = null
    form.value = {
      no: '',
      vendorNo: '',
      buyFromVendorName: '',
      postingDescription: '',
      buyFromAddress: '',
      buyFromCity: '',
      buyFromCounty: '',
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
      jobQueueStatus: 'Pending',
      languageCode: 'KZ',
      currencyCode: 'KZT',
      pricesIncludingVAT: 1,
      vatBusPostingGroup: 'VAT-KZ',
      vendorPostingGroup: 'VPG-01',
      paymentTermsCode: '',
      paymentMethodCode: '',
      shipmentMethodCode: '',
      remitToName: '',
      remitToAddress: '',
      remitToCity: '',
      remitToPostCode: '',
      remitToCountryRegionCode: 'KZ',
      remitToContact: '',
      transactionSpecification: '',
      transactionType: '',
      transportMethod: '',
      entryPoint: '',
      area: '',
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      'Failed to create purchase order. Please check the form data.'
    console.error('Error creating purchase order:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent
      class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto p-4"
    >
      <DialogHeader>
        <DialogTitle>Create New Purchase Order</DialogTitle>
        <DialogDescription>Fill in the purchase order details below</DialogDescription>
      </DialogHeader>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <div class="grid gap-4 py-4">
        <!-- Order No -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="no" class="text-right">Order No</label>
            <Input id="no" v-model="form.no" class="col-span-3" required />
          </div>
        </div>

        <!-- Vendor -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="vendorNo" class="text-right">Vendor</label>
            <Select v-model="form.vendorNo" :disabled="vendorsStore.loading">
              <SelectTrigger class="col-span-3">
                <SelectValue
                  :placeholder="vendorsStore.loading ? 'Loading vendors...' : 'Select a vendor'"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vendors</SelectLabel>
                  <SelectItem
                    v-for="vendor in vendorsStore.vendors"
                    :key="vendor.BIN"
                    :value="vendor.BIN"
                  >
                    {{ vendor.BIN }} - {{ vendor.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Order Date -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="orderDate" class="text-right">Order Date</label>
            <Input
              id="orderDate"
              v-model="form.orderDate"
              type="date"
              class="col-span-3"
              required
            />
          </div>
        </div>

        <!-- Due Date -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="dueDate" class="text-right">Due Date</label>
            <Input id="dueDate" v-model="form.dueDate" type="date" class="col-span-3" required />
          </div>
        </div>

        <!-- Description -->
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

        <!-- Vendor Name -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="buyFromVendorName" class="text-right">Vendor Name</label>
            <Input id="buyFromVendorName" v-model="form.buyFromVendorName" class="col-span-3" />
          </div>
        </div>

        <!-- Contact Email -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="buyFromContactEmail" class="text-right">Contact Email</label>
            <Input
              id="buyFromContactEmail"
              v-model="form.buyFromContactEmail"
              type="email"
              class="col-span-3"
            />
          </div>
        </div>

        <!-- Address -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="buyFromAddress" class="text-right">Address</label>
            <Input id="buyFromAddress" v-model="form.buyFromAddress" class="col-span-3" />
          </div>
        </div>

        <!-- City -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="buyFromCity" class="text-right">City</label>
            <Input id="buyFromCity" v-model="form.buyFromCity" class="col-span-3" />
          </div>
        </div>

        <!-- Contact -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="buyFromContact" class="text-right">Contact</label>
            <Input id="buyFromContact" v-model="form.buyFromContact" class="col-span-3" />
          </div>
        </div>

        <!-- Contact Phone -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="buyFromContactPhoneNo" class="text-right">Contact Phone</label>
            <Input
              id="buyFromContactPhoneNo"
              v-model="form.buyFromContactPhoneNo"
              class="col-span-3"
            />
          </div>
        </div>

        <!-- Currency -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="currencyCode" class="text-right">Currency</label>
            <Input id="currencyCode" v-model="form.currencyCode" class="col-span-3" />
          </div>
        </div>

        <!-- Status -->
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

        <!-- Payment Method -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="paymentMethodCode" class="text-right">Payment Method</label>
            <Input id="paymentMethodCode" v-model="form.paymentMethodCode" class="col-span-3" />
          </div>
        </div>

        <!-- VAT Bus. Posting Group -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="vatBusPostingGroup" class="text-right">VAT Bus. Posting Group</label>
            <Input id="vatBusPostingGroup" v-model="form.vatBusPostingGroup" class="col-span-3" />
          </div>
        </div>

        <!-- Vendor Posting Group -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="vendorPostingGroup" class="text-right">Vendor Posting Group</label>
            <Input id="vendorPostingGroup" v-model="form.vendorPostingGroup" class="col-span-3" />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit">Create</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
