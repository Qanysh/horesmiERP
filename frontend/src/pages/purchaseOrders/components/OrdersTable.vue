<script setup>
defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete"]);
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ order.no }}
    </td>
    <td class="px-6 py-4">{{ order.buyFromVendorNo }}</td>
    <td class="px-6 py-4">{{ order.orderAddressCode }}</td>
    <td class="px-6 py-4">{{ order.buyFromVendorName }}</td>
    <td class="px-6 py-4">{{ order.vendorAuthorizationNo }}</td>
    <td class="px-6 py-4">{{ order.buyFromPostCode }}</td>
    <td class="px-6 py-4">{{ order.buyFromCountryRegionCode }}</td>
    <td class="px-6 py-4 text-right">
      <button
        @click.stop="emit('delete', order.no)"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
