<script setup>
defineProps({
  searchQuery: String
})

defineEmits(['update:searchQuery', 'openModal'])
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-4">
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        placeholder="Search by email or name"
        class="w-full rounded-md border px-4 py-2 text-gray-700"
      />
    </div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Customer</h1>
      <button
        @click="$emit('openModal')"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Customer
      </button>
    </div>
  </div>
</template>