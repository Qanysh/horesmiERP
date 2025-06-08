<script setup>
import { ref, watch } from 'vue'
import { useAdminStore } from '@/stores/admin'
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const store = useAdminStore()
const props = defineProps({
  open: Boolean,
  user: Object,
})

const emit = defineEmits(['update:open', 'saved'])

const form = ref({
  id: '',
  username: '',
  role: 'user',
})

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'purchases manager', label: 'Purchases Manager' },
  { value: 'sales manager', label: 'Sales Manager' },
  { value: 'user', label: 'User' },
]

watch(
  () => props.user,
  (val) => {
    if (val) {
      form.value = {
        id: val.id || '',
        username: val.username || '',
        role: val.role || 'user',
      }
    } else {
      form.value = {
        id: '',
        username: '',
        role: 'user',
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  try {
    const payload = {
      username: form.value.username,
      role: form.value.role,
    }

    await store.updateUser(form.value.id, payload)
    emit('saved')
    emit('update:open', false)
  } catch (error) {
    console.error('Error saving user:', error)
    alert(`Failed to save user: ${error.response?.data?.message || error.message}`)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription>Update user details below</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="username" class="text-right">Username</label>
          <Input id="username" v-model="form.username" class="col-span-3" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="role" class="text-right">Role</label>
          <Select v-model="form.role">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="role in roles" :key="role.value" :value="role.value">
                {{ role.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit">Save</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
