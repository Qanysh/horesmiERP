<script setup>
import { ref, watch } from 'vue'
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

const store = useVendorsStore()
const props = defineProps({
  open: Boolean,
  vendor: Object,
})

const emit = defineEmits(['update:open', 'saved'])

const form = ref({
  BIN: '',
  name: '',
  responsibilityCenter: '',
  locationCode: '',
  phoneNo: '',
  contact: '',
  currencyCode: '',
  searchName: '',
})

watch(
  () => props.vendor,
  (val) => {
    if (val) {
      form.value = { ...val }
    } else {
      form.value = {
        BIN: '',
        name: '',
        responsibilityCenter: '',
        locationCode: '',
        phoneNo: '',
        contact: '',
        currencyCode: '',
        searchName: '',
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  try {
    if (form.value.BIN) {
      await store.updateVendor(form.value.BIN, form.value)
    } else {
      await store.createVendor(form.value)
    }
    emit('saved')
    emit('update:open', false)
  } catch (error) {
    console.error('Error saving vendor:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogDescription> Update vendor details below </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div
          v-for="field in [
            { id: 'BIN', label: 'Vendor No' },
            { id: 'name', label: 'Name' },
            { id: 'responsibilityCenter', label: 'Responsibility Center' },
            { id: 'locationCode', label: 'Location Code' },
            { id: 'phoneNo', label: 'Phone' },
            { id: 'contact', label: 'Contact' },
            { id: 'currencyCode', label: 'Currency Code' },
            { id: 'searchName', label: 'Search Name' },
          ]"
          :key="field.id"
          class="grid grid-cols-4 items-center gap-4"
        >
          <label :for="field.id" class="text-right">
            {{ field.label }}
          </label>
          <Input :id="field.id" v-model="form[field.id]" class="col-span-3" />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)"> Cancel </Button>
        <Button @click="handleSubmit"> Save </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
