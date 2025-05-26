<script setup>
defineProps({
  customer: Object,
});
defineEmits(["delete", "edit"]);
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ customer.customer_no }}
    </td>
    <td class="px-6 py-4">{{ customer.name }}</td>
    <td class="px-6 py-4">{{ customer.responsibility_center }}</td>
    <td class="px-6 py-4">{{ customer.location_code }}</td>
    <td class="px-6 py-4">{{ customer.phone_no }}</td>
    <td class="px-6 py-4">{{ customer.contact }}</td>
    <td class="px-6 py-4">{{ customer.salesperson_code }}</td>
    <td class="px-6 py-4">{{ customer.credit_limit_lcy }}</td>
    <td class="px-6 py-4 text-right space-x-2">
      <button
        @click="$emit('edit')"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        Edit
      </button>
      <button
        @click="$emit('delete')"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
