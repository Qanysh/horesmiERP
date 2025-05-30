<script setup>
import { ref, watch, computed } from 'vue'
import { useSalesOrdersStore } from '@/stores/salesOrders'
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

const emit = defineEmits(['update:open', 'saved'])
const store = useSalesOrdersStore()

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
  unitPrice: '',
  lineAmount: '',
  shipmentDate: '',
})

const lineAmount = computed(() => {
  const quantity = parseFloat(form.value.quantity) || 0
  const price = parseFloat(form.value.unitPrice) || 0
  return (quantity * price).toFixed(2)
})

watch(
  () => props.salesLine,
  (val) => {
    if (val) {
      form.value = {
        ...val,
        shipmentDate: val.shipmentDate ? val.shipmentDate.split('T')[0] : '',
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
        unitPrice: '',
        lineAmount: '',
        shipmentDate: '',
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
      await store.updateSalesLine(form.value.id, data)
    } else {
      await store.createSalesLine(data)
    }
    emit('saved')
    emit('update:open', false)
  } catch (error) {
    console.error('Error saving sales line:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>
          {{ salesLine ? 'Edit Sales Line' : 'Add Sales Line' }}
        </DialogTitle>
        <DialogDescription>
          {{ salesLine ? 'Update' : 'Add' }} sales line details below
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
            <label for="unitPrice" class="text-right">Unit Price</label>
            <Input
              id="unitPrice"
              v-model="form.unitPrice"
              type="number"
              class="col-span-3"
              @change="form.lineAmount = lineAmount"
            />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <label for="unitOfMeasureCode" class="text-right">UOM</label>
            <Input id="unitOfMeasureCode" v-model="form.unitOfMeasureCode" class="col-span-3" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="shipmentDate" class="text-right">Shipment Date</label>
            <Input id="shipmentDate" v-model="form.shipmentDate" type="date" class="col-span-3" />
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
