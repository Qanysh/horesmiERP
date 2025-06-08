<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import UsersTable from '@/components/admin/UsersTable.vue'
import UserCreateModal from '@/components/admin/UserEditModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'

const store = useAdminStore()
const isCreateModalOpen = ref(false)
const searchQuery = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return store.users
  const query = searchQuery.value.trim().toLowerCase()
  return store.users.filter((user) => {
    return (
      (user.username || '').toLowerCase().includes(query) ||
      (user.email || '').toLowerCase().includes(query)
    )
  })
})

onMounted(() => {
  store.fetchUsers()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Users Management</h2>
    </div>

    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        v-model="searchQuery"
        placeholder="Search by username or email..."
        class="pl-9 w-full max-w-md"
      />
    </div>

    <UsersTable :users="filteredUsers" />

    <UserCreateModal v-model:open="isCreateModalOpen" @saved="store.fetchUsers()" />
  </div>
</template>
