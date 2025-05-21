<script setup>
defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete", "open-card"]);
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ order.no }}
    </td>
    <td class="px-6 py-4">{{ order.sellToCustomerName }}</td>
    <td class="px-6 py-4">{{ order.postingDescription || "-" }}</td>
    <td class="px-6 py-4">
      {{
        order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "-"
      }}
    </td>
    <td class="px-6 py-4">
      {{ order.dueDate ? new Date(order.dueDate).toLocaleDateString() : "-" }}
    </td>
    <td class="px-6 py-4">
      <span
        :class="{
          'bg-green-100 text-green-800': order.status === 'Open',
          'bg-blue-100 text-blue-800': order.status === 'Released',
          'bg-gray-100 text-gray-800': order.status === 'Pending Approval',
        }"
        class="px-2 py-1 rounded-full text-xs"
      >
        {{ order.status }}
      </span>
    </td>
    <td class="px-6 py-4 text-right">
      <button
        @click="emit('open-card', order.no)"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm mr-2"
      >
        Details
      </button>
      <button
        @click="emit('delete', order.no)"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm mr-2"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
