<script setup>
import { ref } from 'vue'
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

const props = defineProps(['open'])
const emit = defineEmits(['update:open', 'saved'])
const store = useVendorsStore()

const form = ref({
  BIN: '',
  name: '',
  locationCode: '',
  phoneNo: '',
  contact: '',
  currencyCode: '',
  searchName: '',
})

const handleSubmit = async () => {
  try {
    await store.createVendor(form.value)
    emit('saved')
    emit('update:open', false)
    form.value = {
      BIN: '',
      name: '',
      locationCode: '',
      phoneNo: '',
      contact: '',
      currencyCode: '',
      searchName: '',
    }
  } catch (error) {
    console.error('Error creating vendor:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Vendor</DialogTitle>
        <DialogDescription> Update vendor details below </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div
          v-for="field in [
            { id: 'BIN', label: 'Vendor No' },
            { id: 'name', label: 'Name' },
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
        <Button @click="handleSubmit"> Create </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
