<script setup>
import { ref } from 'vue'
import { useCustomersStore } from '@/stores/customers'
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
const store = useCustomersStore()

const form = ref({
  customer_no: '',
  name: '',
  name2: '',
  location_code: '',
  country_region_code: '',
  phone_no: '',
  contact: '',
  credit_limit_lcy: '',
})

const handleSubmit = async () => {
  try {
    await store.createCustomer(form.value)
    emit('saved')
    emit('update:open', false)
    form.value = {
      customer_no: '',
      name: '',
      name2: '',
      location_code: '',
      country_region_code: '',
      phone_no: '',
      contact: '',
      credit_limit_lcy: '',
    }
  } catch (error) {
    console.error('Error creating customer:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Customer</DialogTitle>
        <DialogDescription> Update customer details below </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div
          v-for="field in [
            { id: 'customer_no', label: 'Customer No' },
            { id: 'name', label: 'Name' },
            { id: 'name2', label: 'Surname' },
            { id: 'location_code', label: 'Location Code' },
            { id: 'country_region_code', label: 'Country Code' },
            { id: 'phone_no', label: 'Phone' },
            { id: 'contact', label: 'Contact' },
            { id: 'credit_limit_lcy', label: 'Credit Limit' },
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
