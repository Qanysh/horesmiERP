<script setup>
import { ref, watch, onMounted } from 'vue'
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

const store = usePurchaseOrdersStore()
const vendorsStore = useVendorsStore()
const props = defineProps({
  open: Boolean,
  purchaseOrder: Object,
})
const emit = defineEmits(['update:open', 'saved'])
const errorMessage = ref(null)

const form = ref({
  no: '',
  vendorNo: '',
  orderDate: '',
  status: '',
  buyFromVendorName: '',
  postingDescription: '',
  buyFromAddress: '',
  buyFromAddress2: '',
  buyFromCity: '',
  buyFromCounty: '',
  buyFromPostCode: '',
  buyFromCountryRegionCode: '',
  buyFromContactNo: '',
  buyFromContact: '',
  buyFromContactPhoneNo: '',
  buyFromContactMobilePhoneNo: '',
  buyFromContactEmail: '',
  documentDate: '',
  invoiceReceivedDate: '',
  postingDate: '',
  vatReportingDate: '',
  dueDate: '',
  vendorInvoiceNo: '',
  yourReference: '',
  purchaserCode: '',
  noOfArchivedVersions: 0,
  quoteNo: '',
  vendorOrderNo: '',
  vendorShipmentNo: '',
  orderAddressCode: '',
  responsibilityCenter: '',
  assignedUserId: '',
  jobQueueStatus: 'Pending',
  languageCode: '',
  formatRegion: '',
  currencyCode: '',
  expectedReceiptDate: '',
  pricesIncludingVAT: 0,
  vatBusPostingGroup: '',
  vendorPostingGroup: '',
  paymentTermsCode: '',
  paymentMethodCode: '',
  shortcutDimension1Code: '',
  shortcutDimension2Code: '',
  paymentDiscountPercent: '0.00',
  paymentDiscountDate: '',
  journalTemplName: '',
  taxLiable: 0,
  taxAreaCode: '',
  shipmentMethodCode: '',
  paymentReference: '',
  creditorNo: '',
  onHold: 0,
  inboundWhseHandlingTime: '',
  leadTimeCalculation: '',
  requestedReceiptDate: '',
  promisedReceiptDate: '',
  remitToCode: '',
  remitToName: '',
  remitToAddress: '',
  remitToAddress2: '',
  remitToCity: '',
  remitToCounty: '',
  remitToPostCode: '',
  remitToCountryRegionCode: '',
  remitToContact: '',
  transactionSpecification: '',
  transactionType: '',
  transportMethod: '',
  entryPoint: '',
  area: '',
  prepaymentPercent: '0.00',
  compressPrepayment: 0,
  prepmtPaymentTermsCode: '',
  prepaymentDueDate: '',
  prepmtPaymentDiscountPercent: '0.00',
  prepmtPaymentDiscountDate: '',
  vendorCrMemoNo: '',
})

onMounted(async () => {
  await vendorsStore.fetchVendors()
})

watch(
  () => props.purchaseOrder,
  (val) => {
    if (val) {
      const normalizeDate = (date) => {
        if (!date) return ''
        const parsed = new Date(date)
        return isNaN(parsed) ? '' : parsed.toISOString().split('T')[0]
      }

      form.value = {
        ...val,
        orderDate: normalizeDate(val.orderDate),
        dueDate: normalizeDate(val.dueDate),
        documentDate: normalizeDate(val.documentDate),
        invoiceReceivedDate: normalizeDate(val.invoiceReceivedDate),
        postingDate: normalizeDate(val.postingDate),
        vatReportingDate: normalizeDate(val.vatReportingDate),
        expectedReceiptDate: normalizeDate(val.expectedReceiptDate),
        paymentDiscountDate: normalizeDate(val.paymentDiscountDate),
        requestedReceiptDate: normalizeDate(val.requestedReceiptDate),
        promisedReceiptDate: normalizeDate(val.promisedReceiptDate),
        prepaymentDueDate: normalizeDate(val.prepaymentDueDate),
        prepmtPaymentDiscountDate: normalizeDate(val.prepmtPaymentDiscountDate),
        no: val.no || '',
        vendorNo: val.vendorNo || '',
        status: val.status || '',
        buyFromVendorName: val.buyFromVendorName || '',
        postingDescription: val.postingDescription || '',
        buyFromAddress: val.buyFromAddress || '',
        buyFromAddress2: val.buyFromAddress2 || '',
        buyFromCity: val.buyFromCity || '',
        buyFromCounty: val.buyFromCounty || '',
        buyFromPostCode: val.buyFromPostCode || '',
        buyFromCountryRegionCode: val.buyFromCountryRegionCode || '',
        buyFromContactNo: val.buyFromContactNo || '',
        buyFromContact: val.buyFromContact || '',
        buyFromContactPhoneNo: val.buyFromContactPhoneNo || '',
        buyFromContactMobilePhoneNo: val.buyFromContactMobilePhoneNo || '',
        buyFromContactEmail: val.buyFromContactEmail || '',
        vendorInvoiceNo: val.vendorInvoiceNo || '',
        yourReference: val.yourReference || '',
        purchaserCode: val.purchaserCode || '',
        noOfArchivedVersions: val.noOfArchivedVersions || 0,
        quoteNo: val.quoteNo || '',
        vendorOrderNo: val.vendorOrderNo || '',
        vendorShipmentNo: val.vendorShipmentNo || '',
        orderAddressCode: val.orderAddressCode || '',
        responsibilityCenter: val.responsibilityCenter || '',
        assignedUserId: val.assignedUserId || '',
        jobQueueStatus: val.jobQueueStatus || 'Pending',
        languageCode: val.languageCode || '',
        formatRegion: val.formatRegion || '',
        currencyCode: val.currencyCode || '',
        pricesIncludingVAT: val.pricesIncludingVAT || 0,
        vatBusPostingGroup: val.vatBusPostingGroup || '',
        vendorPostingGroup: val.vendorPostingGroup || '',
        paymentTermsCode: val.paymentTermsCode || '',
        paymentMethodCode: val.paymentMethodCode || '',
        shortcutDimension1Code: val.shortcutDimension1Code || '',
        shortcutDimension2Code: val.shortcutDimension2Code || '',
        paymentDiscountPercent: val.paymentDiscountPercent || '0.00',
        journalTemplName: val.journalTemplName || '',
        taxLiable: val.taxLiable || 0,
        taxAreaCode: val.taxAreaCode || '',
        shipmentMethodCode: val.shipmentMethodCode || '',
        paymentReference: val.paymentReference || '',
        creditorNo: val.creditorNo || '',
        onHold: val.onHold || 0,
        inboundWhseHandlingTime: val.inboundWhseHandlingTime || '',
        leadTimeCalculation: val.leadTimeCalculation || '',
        remitToCode: val.remitToCode || '',
        remitToName: val.remitToName || '',
        remitToAddress: val.remitToAddress || '',
        remitToAddress2: val.remitToAddress2 || '',
        remitToCity: val.remitToCity || '',
        remitToCounty: val.remitToCounty || '',
        remitToPostCode: val.remitToPostCode || '',
        remitToCountryRegionCode: val.remitToCountryRegionCode || '',
        remitToContact: val.remitToContact || '',
        transactionSpecification: val.transactionSpecification || '',
        transactionType: val.transactionType || '',
        transportMethod: val.transportMethod || '',
        entryPoint: val.entryPoint || '',
        area: val.area || '',
        prepaymentPercent: val.prepaymentPercent || '0.00',
        compressPrepayment: val.compressPrepayment || 0,
        prepmtPaymentTermsCode: val.prepmtPaymentTermsCode || '',
        prepmtPaymentDiscountPercent: val.prepmtPaymentDiscountPercent || '0.00',
        vendorCrMemoNo: val.vendorCrMemoNo || '',
      }
    } else {
      form.value = {
        no: '',
        vendorNo: '',
        orderDate: '',
        status: '',
        buyFromVendorName: '',
        postingDescription: '',
        buyFromAddress: '',
        buyFromAddress2: '',
        buyFromCity: '',
        buyFromCounty: '',
        buyFromPostCode: '',
        buyFromCountryRegionCode: '',
        buyFromContactNo: '',
        buyFromContact: '',
        buyFromContactPhoneNo: '',
        buyFromContactMobilePhoneNo: '',
        buyFromContactEmail: '',
        documentDate: '',
        invoiceReceivedDate: '',
        postingDate: '',
        vatReportingDate: '',
        dueDate: '',
        vendorInvoiceNo: '',
        yourReference: '',
        purchaserCode: '',
        noOfArchivedVersions: 0,
        quoteNo: '',
        vendorOrderNo: '',
        vendorShipmentNo: '',
        orderAddressCode: '',
        responsibilityCenter: '',
        assignedUserId: '',
        jobQueueStatus: 'Pending',
        languageCode: '',
        formatRegion: '',
        currencyCode: '',
        expectedReceiptDate: '',
        pricesIncludingVAT: 0,
        vatBusPostingGroup: '',
        vendorPostingGroup: '',
        paymentTermsCode: '',
        paymentMethodCode: '',
        shortcutDimension1Code: '',
        shortcutDimension2Code: '',
        paymentDiscountPercent: '0.00',
        paymentDiscountDate: '',
        journalTemplName: '',
        taxLiable: 0,
        taxAreaCode: '',
        shipmentMethodCode: '',
        paymentReference: '',
        creditorNo: '',
        onHold: 0,
        inboundWhseHandlingTime: '',
        leadTimeCalculation: '',
        requestedReceiptDate: '',
        promisedReceiptDate: '',
        remitToCode: '',
        remitToName: '',
        remitToAddress: '',
        remitToAddress2: '',
        remitToCity: '',
        remitToCounty: '',
        remitToPostCode: '',
        remitToCountryRegionCode: '',
        remitToContact: '',
        transactionSpecification: '',
        transactionType: '',
        transportMethod: '',
        entryPoint: '',
        area: '',
        prepaymentPercent: '0.00',
        compressPrepayment: 0,
        prepmtPaymentTermsCode: '',
        prepaymentDueDate: '',
        prepmtPaymentDiscountPercent: '0.00',
        prepmtPaymentDiscountDate: '',
        vendorCrMemoNo: '',
      }
    }
  },
  { immediate: true },
)

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

    const formatDate = (date) => {
      if (!date) return null
      return `${date} 19:00:00`
    }

    const formattedData = {
      ...form.value,
      orderDate: formatDate(form.value.orderDate),
      dueDate: formatDate(form.value.dueDate),
      documentDate: formatDate(form.value.documentDate),
      invoiceReceivedDate: formatDate(form.value.invoiceReceivedDate),
      postingDate: formatDate(form.value.postingDate),
      vatReportingDate: formatDate(form.value.vatReportingDate),
      expectedReceiptDate: formatDate(form.value.expectedReceiptDate),
      paymentDiscountDate: formatDate(form.value.paymentDiscountDate),
      requestedReceiptDate: formatDate(form.value.requestedReceiptDate),
      promisedReceiptDate: formatDate(form.value.promisedReceiptDate),
      prepaymentDueDate: formatDate(form.value.prepaymentDueDate),
      prepmtPaymentDiscountDate: formatDate(form.value.prepmtPaymentDiscountDate),
    }

    await store.updatePurchaseOrder(form.value.no, formattedData)
    emit('saved')
    emit('update:open', false)
    errorMessage.value = null
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || error.message || 'Failed to update purchase order'
    console.error('Error updating purchase order:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent
      class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto p-4"
    >
      <DialogHeader>
        <DialogTitle>Edit Purchase Order</DialogTitle>
        <DialogDescription>Update the purchase order details below</DialogDescription>
      </DialogHeader>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <div class="grid gap-4 py-4">
        <!-- Order No -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="no" class="text-right">Order No</label>
            <Input id="no" v-model="form.no" class="col-span-3" disabled />
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

        <!-- Payment Terms -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="paymentTermsCode" class="text-right">Payment Terms</label>
            <Input id="paymentTermsCode" v-model="form.paymentTermsCode" class="col-span-3" />
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

        <!-- Remit To Name -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="remitToName" class="text-right">Remit To Name</label>
            <Input id="remitToName" v-model="form.remitToName" class="col-span-3" />
          </div>
        </div>

        <!-- Remit To Address -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="remitToAddress" class="text-right">Remit To Address</label>
            <Input id="remitToAddress" v-model="form.remitToAddress" class="col-span-3" />
          </div>
        </div>

        <!-- Remit To City -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="remitToCity" class="text-right">Remit To City</label>
            <Input id="remitToCity" v-model="form.remitToCity" class="col-span-3" />
          </div>
        </div>

        <!-- Remit To Post Code -->
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="remitToPostCode" class="text-right">Remit To Post Code</label>
            <Input id="remitToPostCode" v-model="form.remitToPostCode" class="col-span-3" />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit">Save</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
