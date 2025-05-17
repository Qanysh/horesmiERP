<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["view"]);
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ item.item_no }}
    </td>
    <td class="px-6 py-4">
      {{ item.item_type }}
    </td>
    <td class="px-6 py-4">
      {{ item.description }}
    </td>
    <td class="px-6 py-4">
      {{ item.item_category_code }}
    </td>
    <td class="px-6 py-4">
      {{ item.size }}
    </td>
    <td class="px-6 py-4">
      {{ item.weight }}
    </td>
    <td class="px-6 py-4">
      {{ item.quantity }}
    </td>
    <td class="px-6 py-4">${{ item.unit_cost }}</td>
    <td class="px-6 py-4">${{ item.price }}</td>
    <td class="px-6 py-4 text-right">
      <button
        @click="emit('view', item.item_no)"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Подробнее
      </button>
    </td>
  </tr>
</template>
