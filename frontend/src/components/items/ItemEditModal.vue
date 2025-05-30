<script setup>
import { ref, watch, onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
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

const itemsStore = useItemsStore()
const vendorsStore = useVendorsStore()
const props = defineProps({
  open: Boolean,
  item: Object,
})

const emit = defineEmits(['update:open', 'saved'])

const form = ref({
  item_no: '',
  description: '',
  description2: '',
  type: '',
  inventory: '',
  unitCost: '',
  unitPrice: '',
  vendorNo: '',
  itemCategoryCode: '',
})

onMounted(async () => {
  await vendorsStore.fetchVendors()
})

watch(
  () => props.item,
  (val) => {
    if (val) {
      form.value = { ...val }
    } else {
      form.value = {
        item_no: '',
        description: '',
        description2: '',
        type: '',
        inventory: '',
        unitCost: '',
        unitPrice: '',
        vendorNo: '',
        itemCategoryCode: '',
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  try {
    if (form.value.item_no) {
      await itemsStore.updateItem(form.value.item_no, form.value)
    } else {
      await itemsStore.createItem(form.value)
    }
    emit('saved')
    emit('update:open', false)
  } catch (error) {
    console.error('Error saving item:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogDescription> Update item details below </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="item_no" class="text-right">Item No</label>
          <Input id="item_no" v-model="form.item_no" class="col-span-3" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="description" class="text-right">Description</label>
          <Input id="description" v-model="form.description" class="col-span-3" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="description2" class="text-right">Description 2</label>
          <Input id="description2" v-model="form.description2" class="col-span-3" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="type" class="text-right">Type</label>
          <Input id="type" v-model="form.type" class="col-span-3" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="inventory" class="text-right">Inventory</label>
          <Input id="inventory" v-model="form.inventory" class="col-span-3" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="unitCost" class="text-right">Unit Cost</label>
          <Input id="unitCost" v-model="form.unitCost" class="col-span-3" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="unitPrice" class="text-right">Unit Price</label>
          <Input id="unitPrice" v-model="form.unitPrice" class="col-span-3" />
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
                  :key="vendor.BIN"
                  :value="vendor.BIN"
                >
                  {{ vendor.BIN }} - {{ vendor.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="itemCategoryCode" class="text-right">Category Code</label>
          <Input id="itemCategoryCode" v-model="form.itemCategoryCode" class="col-span-3" />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)"> Cancel </Button>
        <Button @click="handleSubmit"> Save </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
