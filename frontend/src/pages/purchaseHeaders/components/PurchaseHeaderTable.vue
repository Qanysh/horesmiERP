<script setup>
defineProps({
  header: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete", "open-card"]);
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ header.no }}
    </td>
    <td class="px-6 py-4">{{ header.buyFromVendorName }}</td>
    <td class="px-6 py-4">{{ header.postingDescription }}</td>
    <td class="px-6 py-4">
      {{ new Date(header.orderDate).toLocaleDateString() }}
    </td>
    <td class="px-6 py-4">
      {{ new Date(header.dueDate).toLocaleDateString() }}
    </td>
    <td class="px-6 py-4">
      <span
        :class="{
          'bg-green-100 text-green-800': header.status === 'Open',
          'bg-gray-100 text-gray-800': header.status !== 'Open',
        }"
        class="px-2 py-1 rounded-full text-xs"
      >
        {{ header.status }}
      </span>
    </td>
    <td class="px-6 py-4 text-right">
      <button
        @click="emit('open-card', header.no)"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm mr-2"
      >
        Details
      </button>
      <button
        @click="emit('delete', header.no)"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm mr-2"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
