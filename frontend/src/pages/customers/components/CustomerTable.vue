<script setup>
defineProps({
  customer: Object,
});

defineEmits(["delete"]);
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ customer.customer_no }}
    </td>
    <td class="px-6 py-4">
      {{ customer.name }}
    </td>
    <td class="px-6 py-4">
      {{ customer.responsibility_center }}
    </td>
    <td class="px-6 py-4">
      {{ customer.location_code }}
    </td>
    <td class="px-6 py-4">
      {{ customer.phone_no }}
    </td>
    <td class="px-6 py-4">
      {{ customer.contact }}
    </td>
    <td class="px-6 py-4">
      {{ customer.salesperson_code }}
    </td>
    <td class="px-6 py-4">
      {{ customer.credit_limit_lcy }}
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
