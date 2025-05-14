<script setup>
defineProps({
  customer: Object,
});

defineEmits(['delete'])
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ customer.no }}
    </td>
    <td class="px-6 py-4">
      {{ customer.name }}
    </td>
    <td class="px-6 py-4">
      {{ customer.balance }}
    </td>
    <td class="px-6 py-4">
      {{ customer.creditLimit }}
    </td>
    <td class="px-6 py-4">
      {{ customer.totalSales }}
    </td>
    <td class="px-6 py-4">
      {{ customer.costs }}
    </td>
    <td class="px-6 py-4">
      {{ customer.address }}
    </td>
    <td class="px-6 py-4">
      {{ customer.country }}
    </td>
    <td class="px-6 py-4">
      {{ customer.city }}
    </td>
    <td class="px-6 py-4">
      {{ customer.phone }}
    </td>
    <td class="px-6 py-4">
      {{ customer.email }}
    </td>
    <td class="px-6 py-4">
      {{ customer.contactName }}
    </td>
    <td class="px-6 py-4 text-right">
      <button
        @click="$emit('delete')"
        class="font-medium text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </td>
  </tr>
</template>