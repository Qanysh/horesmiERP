<script setup>
import { ref, watch, computed } from 'vue'
import { usePurchaseOrdersStore } from '@/stores/purchaseOrders'
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
  purchaseLine: Object,
  documentNo: String,
  buyFromVendorNo: String,
})

const emit = defineEmits(['update:open', 'saved', 'error'])
const purchaseOrdersStore = usePurchaseOrdersStore()
const itemsStore = useItemsStore()
const errorMessage = ref('')

const form = ref({
  documentType: 'Order',
  documentNo: props.documentNo || '',
  buyFromVendorNo: props.buyFromVendorNo || '',
  lineNo: '',
  type: 'Item',
  no: '',
  variantCode: 'None',
  description: '',
  description2: '',
  locationCode: '',
  quantity: '0.00000',
  reservedQtyBase: '0.00000',
  unitOfMeasureCode: 'PCS',
  directUnitCost: '0.00',
  indirectCostPercent: '0.00',
  unitCostLCY: '0.00',
  unitPriceLCY: '0.00',
  lineAmount: '0.00',
  orderNo: props.documentNo || '',
  allocationAccountNo: '',
  jobNo: '',
  jobTaskNo: '',
  jobLineType: '',
  expectedReceiptDate: '',
})

itemsStore.fetchItems()

const lineAmount = computed(() => {
  const qty = parseFloat(form.value.quantity) || 0
  const cost = parseFloat(form.value.directUnitCost) || 0
  return (qty * cost).toFixed(2)
})

watch(
  () => props.purchaseLine,
  (val) => {
    if (val) {
      const normalizeDate = (date) => {
        if (!date) return ''
        const parsed = new Date(date)
        return isNaN(parsed) ? '' : parsed.toISOString().split('T')[0]
      }
      form.value = {
        ...val,
        documentType: val.documentType || 'Order',
        documentNo: val.documentNo || props.documentNo,
        buyFromVendorNo: val.buyFromVendorNo || props.buyFromVendorNo,
        lineNo: val.lineNo || '',
        type: val.type || 'Item',
        no: val.no || '',
        variantCode: val.variantCode || 'None',
        description: val.description || '',
        description2: val.description2 || '',
        locationCode: val.locationCode || '',
        quantity: parseFloat(val.quantity || '0').toFixed(5),
        reservedQtyBase: parseFloat(val.reservedQtyBase || '0').toFixed(5),
        unitOfMeasureCode: val.unitOfMeasureCode || 'PCS',
        directUnitCost: parseFloat(val.directUnitCost || '0').toFixed(2),
        indirectCostPercent: parseFloat(val.indirectCostPercent || '0').toFixed(2),
        unitCostLCY: parseFloat(val.unitCostLCY || '0').toFixed(2),
        unitPriceLCY: parseFloat(val.unitPriceLCY || '0').toFixed(2),
        lineAmount: parseFloat(val.lineAmount || '0').toFixed(2),
        orderNo: val.orderNo || props.documentNo,
        allocationAccountNo: val.allocationAccountNo || '',
        jobNo: val.jobNo || '',
        jobTaskNo: val.jobTaskNo || '',
        jobLineType: val.jobLineType || '',
        expectedReceiptDate: normalizeDate(val.expectedReceiptDate),
      }
    } else {
      form.value = {
        documentType: 'Order',
        documentNo: props.documentNo || '',
        buyFromVendorNo: props.buyFromVendorNo || '',
        lineNo: '',
        type: 'Item',
        no: '',
        variantCode: 'None',
        description: '',
        description2: '',
        locationCode: '',
        quantity: '0.00000',
        reservedQtyBase: '0.00000',
        unitOfMeasureCode: 'PCS',
        directUnitCost: '0.00',
        indirectCostPercent: '0.00',
        unitCostLCY: '0.00',
        unitPriceLCY: '0.00',
        lineAmount: '0.00',
        orderNo: props.documentNo || '',
        allocationAccountNo: '',
        jobNo: '',
        jobTaskNo: '',
        jobLineType: '',
        expectedReceiptDate: '',
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

watch(
  () => props.buyFromVendorNo,
  (val) => {
    form.value.buyFromVendorNo = val
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
    if (!form.value.directUnitCost || parseFloat(form.value.directUnitCost) < 0) {
      errorMessage.value = 'Unit Cost cannot be negative'
      return
    }
    if (!form.value.buyFromVendorNo) {
      errorMessage.value = 'Vendor No is required'
      return
    }

    const formatDate = (date) => {
      if (!date) return null
      return `${date} 19:00:00`
    }

    const data = {
      ...form.value,
      no: form.value.no,
      quantity: parseFloat(form.value.quantity).toFixed(5),
      reservedQtyBase: parseFloat(form.value.reservedQtyBase).toFixed(5),
      directUnitCost: parseFloat(form.value.directUnitCost).toFixed(2),
      indirectCostPercent: parseFloat(form.value.indirectCostPercent).toFixed(2),
      unitCostLCY: parseFloat(form.value.unitCostLCY).toFixed(2),
      unitPriceLCY: parseFloat(form.value.unitPriceLCY).toFixed(2),
      lineAmount: parseFloat(lineAmount.value).toFixed(2),
      expectedReceiptDate: formatDate(form.value.expectedReceiptDate),
    }

    if (!form.value.id) {
      delete data.id
      await purchaseOrdersStore.createPurchaseLine(data)
    } else {
      await purchaseOrdersStore.updatePurchaseLine(form.value.id, data)
    }
    emit('saved')
    emit('update:open', false)
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to save purchase line'
    emit('error', errorMessage.value)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6">
      <DialogHeader>
        <DialogTitle>{{ purchaseLine ? 'Edit Purchase Line' : 'Add Purchase Line' }}</DialogTitle>
        <DialogDescription
          >{{ purchaseLine ? 'Update' : 'Add' }} purchase line details below</DialogDescription
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
          <label for="directUnitCost" class="text-right font-medium">Unit Cost</label>
          <Input
            id="directUnitCost"
            v-model="form.directUnitCost"
            type="number"
            class="col-span-3"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="unitPriceLCY" class="text-right font-medium">Unit Price</label>
          <Input id="unitPriceLCY" v-model="form.unitPriceLCY" type="number" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="unitOfMeasureCode" class="text-right font-medium">UOM</label>
          <Input id="unitOfMeasureCode" v-model="form.unitOfMeasureCode" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="expectedReceiptDate" class="text-right font-medium">Expected Date</label>
          <Input
            id="expectedReceiptDate"
            v-model="form.expectedReceiptDate"
            type="date"
            class="col-span-3"
          />
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
          <label for="indirectCostPercent" class="text-right font-medium">Indirect Cost %</label>
          <Input
            id="indirectCostPercent"
            v-model="form.indirectCostPercent"
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
          <label for="allocationAccountNo" class="text-right font-medium">Allocation Account</label>
          <Input id="allocationAccountNo" v-model="form.allocationAccountNo" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="jobNo" class="text-right font-medium">Job No</label>
          <Input id="jobNo" v-model="form.jobNo" class="col-span-3" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <label for="jobTaskNo" class="text-right font-medium">Job Task No</label>
          <Input id="jobTaskNo" v-model="form.jobTaskNo" class="col-span-3" />
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
