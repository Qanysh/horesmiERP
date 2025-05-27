<!-- components/purchaseOrders/PurchaseLineEditModal.vue -->
<script setup>
import { ref, watch, computed } from 'vue'
import { usePurchaseOrdersStore } from '@/stores/purchaseOrders'
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
})

const emit = defineEmits(['update:open', 'saved'])
const store = usePurchaseOrdersStore()

const form = ref({
  documentType: 'Order',
  documentNo: props.documentNo,
  lineNo: '',
  type: 'Item',
  no: '',
  description: '',
  description2: '',
  quantity: '',
  unitOfMeasureCode: 'PCS',
  directUnitCost: '',
  unitPriceLCY: '',
  expectedReceiptDate: '',
})

const lineAmount = computed(() => {
  const quantity = parseFloat(form.value.quantity) || 0
  const cost = parseFloat(form.value.directUnitCost) || 0
  return (quantity * cost).toFixed(2)
})

watch(
  () => props.purchaseLine,
  (val) => {
    if (val) {
      form.value = {
        ...val,
        expectedReceiptDate: val.expectedReceiptDate ? val.expectedReceiptDate.split('T')[0] : '',
      }
    } else {
      form.value = {
        documentType: 'Order',
        documentNo: props.documentNo,
        lineNo: '',
        type: 'Item',
        no: '',
        description: '',
        description2: '',
        quantity: '',
        unitOfMeasureCode: 'PCS',
        directUnitCost: '',
        unitPriceLCY: '',
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
  },
)

const handleSubmit = async () => {
  try {
    const data = {
      ...form.value,
      lineAmount: lineAmount.value,
    }

    if (form.value.id) {
      await store.updatePurchaseLine(form.value.id, data)
    } else {
      await store.createPurchaseLine(data)
    }
    emit('saved')
    emit('update:open', false)
  } catch (error) {
    console.error('Error saving purchase line:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>
          {{ purchaseLine ? 'Edit Purchase Line' : 'Add Purchase Line' }}
        </DialogTitle>
        <DialogDescription>
          {{ purchaseLine ? 'Update' : 'Add' }} purchase line details below
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="no" class="text-right">Item No</label>
            <Input id="no" v-model="form.no" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="quantity" class="text-right">Quantity</label>
            <Input
              id="quantity"
              v-model="form.quantity"
              type="number"
              class="col-span-3"
              @change="form.lineAmount = lineAmount"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="directUnitCost" class="text-right">Unit Cost</label>
            <Input
              id="directUnitCost"
              v-model="form.directUnitCost"
              type="number"
              class="col-span-3"
              @change="form.lineAmount = lineAmount"
            />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="unitPriceLCY" class="text-right">Unit Price</label>
            <Input id="unitPriceLCY" v-model="form.unitPriceLCY" type="number" class="col-span-3" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="unitOfMeasureCode" class="text-right">UOM</label>
            <Input id="unitOfMeasureCode" v-model="form.unitOfMeasureCode" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="expectedReceiptDate" class="text-right">Expected Date</label>
            <Input
              id="expectedReceiptDate"
              v-model="form.expectedReceiptDate"
              type="date"
              class="col-span-3"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="description" class="text-right">Description</label>
            <Input id="description" v-model="form.description" class="col-span-3" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="description2" class="text-right">Description 2</label>
            <Input id="description2" v-model="form.description2" class="col-span-3" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label class="text-right font-medium">Line Amount</label>
            <div class="col-span-3 text-sm">
              {{ lineAmount }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)"> Cancel </Button>
        <Button @click="handleSubmit"> Save </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
