<script setup>
defineProps({
  vendor: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ vendor.no }}
    </td>
    <td class="px-6 py-4">{{ vendor.name }}</td>
    <td class="px-6 py-4">{{ vendor.balance }}</td>
    <td class="px-6 py-4">{{ vendor.creditLimit }}</td>
    <td class="px-6 py-4">{{ vendor.totalSales }}</td>
    <td class="px-6 py-4">{{ vendor.costs }}</td>
    <td class="px-6 py-4">{{ vendor.address }}</td>
    <td class="px-6 py-4">{{ vendor.country }}</td>
    <td class="px-6 py-4">{{ vendor.city }}</td>
    <td class="px-6 py-4">{{ vendor.phone }}</td>
    <td class="px-6 py-4">{{ vendor.email }}</td>
    <td class="px-6 py-4">{{ vendor.contactName }}</td>
    <td class="px-6 py-4 text-right">
      <button
        @click="emit('delete', vendor.no)"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        Delete
      </button>
    </td>
  </tr>
</template>