<script setup>
import { ref, onMounted } from 'vue'
import { useProductionToolsStore } from '@/stores/productionTools'
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

const props = defineProps(['open'])
const emit = defineEmits(['update:open', 'saved'])
const productionToolsStore = useProductionToolsStore()

const form = ref({
  tool_no: '',
  name: '',
  description: '',
  type: '',
  locationCode: '',
  status: 'Active',
  isArchived: 0,
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.tool_no.trim()) {
    errors.value.tool_no = 'Tool No is required'
    isValid = false
  }
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    alert('Please fix the form errors before submitting')
    return
  }

  try {
    await productionToolsStore.createProductionTool(form.value)
    emit('saved')
    emit('update:open', false)
    form.value = {
      tool_no: '',
      name: '',
      description: '',
      type: '',
      locationCode: '',
      status: 'Active',
      isArchived: 0,
    }
  } catch (error) {
    console.error('Error creating production tool:', error)
    alert(`Failed to create production tool: ${error.response?.data?.message || error.message}`)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Production Tool</DialogTitle>
        <DialogDescription>Enter production tool details below</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="tool_no" class="text-right">Tool No</label>
          <Input
            id="tool_no"
            v-model="form.tool_no"
            class="col-span-3"
            :class="{ 'border-red-500': errors.tool_no }"
          />
          <div v-if="errors.tool_no" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.tool_no }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="name" class="text-right">Name</label>
          <Input
            id="name"
            v-model="form.name"
            class="col-span-3"
            :class="{ 'border-red-500': errors.name }"
          />
          <div v-if="errors.name" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.name }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="description" class="text-right">Description</label>
          <Input id="description" v-model="form.description" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="type" class="text-right">Type</label>
          <Input id="type" v-model="form.type" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="locationCode" class="text-right">Location Code</label>
          <Input id="locationCode" v-model="form.locationCode" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="status" class="text-right">Status</label>
          <Select v-model="form.status">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit">Create</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
