<script setup>
import { ref, watch } from 'vue'
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

const store = useCustomersStore()
const props = defineProps({
  open: Boolean,
  customer: Object,
})

const emit = defineEmits(['update:open', 'saved'])

const form = ref({
  customer_no: '',
  name: '',
  name2: '',
  responsibility_center: '',
  location_code: '',
  country_region_code: '',
  phone_no: '',
  contact: '',
  salesperson_code: '',
  credit_limit_lcy: '',
})

watch(
  () => props.customer,
  (val) => {
    if (val) {
      form.value = { ...val }
    } else {
      form.value = {
        customer_no: '',
        name: '',
        name2: '',
        responsibility_center: '',
        location_code: '',
        country_region_code: '',
        phone_no: '',
        contact: '',
        salesperson_code: '',
        credit_limit_lcy: '',
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  try {
    if (form.value.customer_no) {
      await store.updateCustomer(form.value.customer_no, form.value)
    } else {
      await store.createCustomer(form.value)
    }
    emit('saved')
    emit('update:open', false)
  } catch (error) {
    console.error('Error saving customer:', error)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogDescription> Update customer details below </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div
          v-for="field in [
            { id: 'customer_no', label: 'Customer No' },
            { id: 'name', label: 'Name' },
            { id: 'name2', label: 'Name 2' },
            { id: 'responsibility_center', label: 'Responsibility Center' },
            { id: 'location_code', label: 'Location Code' },
            { id: 'country_region_code', label: 'Country Code' },
            { id: 'phone_no', label: 'Phone' },
            { id: 'contact', label: 'Contact' },
            { id: 'salesperson_code', label: 'Salesperson' },
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
        <Button @click="handleSubmit"> Save </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
