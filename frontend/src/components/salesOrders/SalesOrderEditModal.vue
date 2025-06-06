<script setup>
import { ref, watch, computed } from 'vue'
import { useSalesOrdersStore } from '@/stores/salesOrders'
import { useItemsStore } from '@/stores/items'
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

const props = defineProps({
  open: Boolean,
  salesLine: Object,
  documentNo: String,
})

const emit = defineEmits(['update:open', 'saved', 'error'])
const store = useSalesOrdersStore()
const itemsStore = useItemsStore()
const errorMessage = ref('')

const form = ref({
  documentType: 'Order',
  documentNo: props.documentNo || '',
  sellToCustomerNo: '',
  lineNo: '',
  type: 'Item',
  no: '',
  variantCode: '',
  description: '',
  description2: '',
  locationCode: '',
  quantity: '1',
  reservedQtyBase: '1',
  unitOfMeasureCode: 'PCS',
  unitPrice: '1',
  unitCostLCY: '1',
  lineAmount: '1',
  orderNo: props.documentNo || '',
  jobLineType: '',
  shipmentDate: '',
  outstandingQuantity: '1',
  discountPercent: '1',
  allowInvoiceDiscount: 1,
})

itemsStore.fetchItems()

const lineAmount = computed(() => {
  const quantity = parseFloat(form.value.quantity) || 0
  const price = parseFloat(form.value.unitPrice) || 0
  return (quantity * price).toFixed(2)
})

watch(
  () => props.salesLine,
  (val) => {
    if (val && !val.isNew) {
      const normalizeDate = (date) => {
        if (!date) return ''
        const parsed = new Date(date)
        return isNaN(parsed) ? '' : parsed.toISOString().split('T')[0]
      }
      form.value = {
        ...val,
        documentType: val.documentType || 'Order',
        documentNo: val.documentNo || props.documentNo,
        sellToCustomerNo: val.sellToCustomerNo || '',
        lineNo: val.lineNo || '',
        type: val.type || 'Item',
        no: val.no || '',
        variantCode: val.variantCode || '',
        description: val.description || '',
        description2: val.description2 || '',
        locationCode: val.locationCode || '',
        quantity: parseFloat(val.quantity || '0').toFixed(5),
        reservedQtyBase: parseFloat(val.reservedQtyBase || '0').toFixed(5),
        unitOfMeasureCode: val.unitOfMeasureCode || 'PCS',
        unitPrice: parseFloat(val.unitPrice || '0').toFixed(2),
        unitCostLCY: parseFloat(val.unitCostLCY || '0').toFixed(2),
        lineAmount: parseFloat(val.lineAmount || '0').toFixed(2),
        orderNo: val.orderNo || props.documentNo,
        jobLineType: val.jobLineType || '',
        shipmentDate: normalizeDate(val.shipmentDate),
        outstandingQuantity: parseFloat(val.outstandingQuantity || '0').toFixed(5),
        discountPercent: parseFloat(val.discountPercent || '0').toFixed(2),
        allowInvoiceDiscount: val.allowInvoiceDiscount || 1,
      }
    } else {
      form.value = {
        documentType: 'Order',
        documentNo: props.documentNo || '',
        sellToCustomerNo: '',
        lineNo: '',
        type: 'Item',
        no: '',
        variantCode: '',
        description: '',
        description2: '',
        locationCode: '',
        quantity: '1',
        reservedQtyBase: '1',
        unitOfMeasureCode: 'PCS',
        unitPrice: '1',
        unitCostLCY: '1',
        lineAmount: '1',
        orderNo: props.documentNo || '',
        jobLineType: '',
        shipmentDate: '',
        outstandingQuantity: '1',
        discountPercent: '1',
        allowInvoiceDiscount: 1,
      }
    }
  },
  { immediate: true },
)

watch(
  () => props.documentNo,
  (val) => {
    form.value.documentNo = val
    form.value.orderNo = val
  },
)

const handleSubmit = async () => {
  try {
    if (!form.value.documentNo) {
      errorMessage.value = 'Document No is required'
      return
    }
    if (!form.value.no) {
      errorMessage.value = 'Item No is required'
      return
    }
    if (!form.value.lineNo) {
      errorMessage.value = 'Line No is required'
      return
    }
    if (!form.value.quantity || parseFloat(form.value.quantity) <= 0) {
      errorMessage.value = 'Quantity must be greater than 0'
      return
    }
    if (!form.value.unitPrice || parseFloat(form.value.unitPrice) <= 0) {
      errorMessage.value = 'Unit Price must be greater than 0'
      return
    }

    const formatDate = (date) => {
      if (!date) return null
      return `${date} 19:00:00`
    }

    const data = {
      ...form.value,
      quantity: parseFloat(form.value.quantity).toFixed(5),
      reservedQtyBase: parseFloat(form.value.reservedQtyBase).toFixed(5),
      unitPrice: parseFloat(form.value.unitPrice).toFixed(2),
      unitCostLCY: parseFloat(form.value.unitCostLCY).toFixed(2),
      lineAmount: parseFloat(lineAmount.value).toFixed(2),
      outstandingQuantity: parseFloat(form.value.outstandingQuantity).toFixed(5),
      discountPercent: parseFloat(form.value.discountPercent).toFixed(2),
      shipmentDate: formatDate(form.value.shipmentDate),
      orderNo: form.value.documentNo, // Ensure orderNo matches documentNo
    }

    if (!props.salesLine || props.salesLine.isNew) {
      delete data.id
      await store.createSalesLine(data)
    } else {
      await store.updateSalesLine(form.value.id, data)
    }
    emit('saved')
    emit('update:open', false)
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to save sales line'
    emit('error', errorMessage.value)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{{
          salesLine && !salesLine.isNew ? 'Edit Sales Line' : 'Add Sales Line'
        }}</DialogTitle>
        <DialogDescription
          >{{ salesLine && !salesLine.isNew ? 'Update' : 'Add' }} sales line details
          below</DialogDescription
        >
      </DialogHeader>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="no" class="text-right font-medium">Item No</label>
          <Select v-model="form.no" class="col-span-3" :disabled="itemsStore.loading">
            <SelectTrigger>
              <SelectValue
                :placeholder="
                  itemsStore.loading
                    ? 'Loading items...'
                    : itemsStore.error
                      ? 'Failed to load items'
                      : 'Select an item'
                "
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Items</SelectLabel>
                <SelectItem
                  v-for="item in itemsStore.items"
                  :key="item.item_no"
                  :value="item.item_no"
                >
                  {{ item.item_no }} - {{ item.description }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="lineNo" class="text-right font-medium">Line No</label>
          <Input id="lineNo" v-model="form.lineNo" class="col-span-3" required />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="quantity" class="text-right font-medium">Quantity</label>
          <Input id="quantity" v-model="form.quantity" type="number" class="col-span-3" required />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="unitPrice" class="text-right font-medium">Unit Price</label>
          <Input
            id="unitPrice"
            v-model="form.unitPrice"
            type="number"
            class="col-span-3"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="unitOfMeasureCode" class="text-right font-medium">UOM</label>
          <Input id="unitOfMeasureCode" v-model="form.unitOfMeasureCode" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="shipmentDate" class="text-right font-medium">Shipment Date</label>
          <Input id="shipmentDate" v-model="form.shipmentDate" type="date" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="variantCode" class="text-right font-medium">Variant Code</label>
          <Input id="variantCode" v-model="form.variantCode" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="locationCode" class="text-right font-medium">Location Code</label>
          <Input id="locationCode" v-model="form.locationCode" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="discountPercent" class="text-right font-medium">Discount %</label>
          <Input
            id="discountPercent"
            v-model="form.discountPercent"
            type="number"
            class="col-span-3"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="unitCostLCY" class="text-right font-medium">Unit Cost LCY</label>
          <Input id="unitCostLCY" v-model="form.unitCostLCY" type="number" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="description" class="text-right font-medium">Description</label>
          <Input id="description" v-model="form.description" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="description2" class="text-right font-medium">Description 2</label>
          <Input id="description2" v-model="form.description2" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="jobLineType" class="text-right font-medium">Job Line Type</label>
          <Input id="jobLineType" v-model="form.jobLineType" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label class="text-right font-medium">Line Amount</label>
          <div class="col-span-3 text-sm">{{ lineAmount }}</div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit" :disabled="itemsStore.loading">Save</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
