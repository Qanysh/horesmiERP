<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2Icon, MoreHorizontal } from 'lucide-vue-next'
import UserEditModal from './UserEditModal.vue'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
})

const store = useAdminStore()
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedUser = ref(null)
const userToDelete = ref(null)
const loading = ref(false)

const openEditModal = (user) => {
  selectedUser.value = { ...user }
  isEditModalOpen.value = true
}

const openDeleteModal = (user) => {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (!userToDelete.value) return
  try {
    loading.value = true
    await store.deleteUser(userToDelete.value.id)
    isDeleteModalOpen.value = false
    userToDelete.value = null
  } catch (error) {
    console.error('Delete failed:', error)
    alert(`Failed to delete user: ${error.response?.data?.message || error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-full flex flex-col space-y-4">
    <div class="text-sm text-muted-foreground">
      Showing {{ props.users.length }} of {{ store.users.length }} users
    </div>

    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="props.users.length === 0">
            <TableCell colspan="7" class="text-center py-4">No users found</TableCell>
          </TableRow>
          <TableRow v-for="user in props.users" :key="user.id">
            <TableCell class="font-medium">{{ user.username || '-' }}</TableCell>
            <TableCell>{{ user.email || '-' }}</TableCell>
            <TableCell>{{ user.company || '-' }}</TableCell>
            <TableCell>
              <Badge
                :class="{
                  'bg-red-100 text-red-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'manager',
                  'bg-green-100 text-green-800': user.role === 'purchases manager',
                  'bg-yellow-100 text-yellow-800': user.role === 'sales manager',
                  'bg-gray-100 text-gray-800': !user.role || user.role === 'user',
                }"
                variant="outline"
              >
                {{ user.role || 'user' }}
              </Badge>
            </TableCell>
            <TableCell>
              {{ new Date(user.created_at).toLocaleDateString() }}
            </TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="h-8 w-8 p-0" :disabled="loading">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openEditModal(user)">
                    <PencilIcon class="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="openDeleteModal(user)" class="text-red-500">
                    <Trash2Icon class="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <UserEditModal
      v-model:open="isEditModalOpen"
      :user="selectedUser"
      @saved="store.fetchUsers()"
    />

    <Dialog v-model:open="isDeleteModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            <span class="font-medium">{{ userToDelete?.username || 'this user' }}</span
            >? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="isDeleteModalOpen = false">Cancel</Button>
          <Button variant="destructive" @click="handleDelete" :disabled="loading"> Delete </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
