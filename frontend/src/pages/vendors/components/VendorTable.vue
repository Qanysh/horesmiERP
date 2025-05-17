<script setup>
defineProps({
  vendor: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete"]);
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ vendor.vendorNo }}
    </td>
    <td class="px-6 py-4">{{ vendor.name }}</td>
    <td class="px-6 py-4">{{ vendor.responsibilityCenter }}</td>
    <td class="px-6 py-4">{{ vendor.locationCode }}</td>
    <td class="px-6 py-4">{{ vendor.phoneNo }}</td>
    <td class="px-6 py-4">{{ vendor.contact }}</td>
    <td class="px-6 py-4">{{ vendor.currencyCode }}</td>
    <td class="px-6 py-4">{{ vendor.searchName }}</td>
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
