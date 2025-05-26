<script setup>
const props = defineProps({
  item: Object,
});
const emit = defineEmits(["click", "delete"]);
</script>

<template>
  <tr
    class="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out"
  >
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ item.item_no }}
    </td>
    <td class="px-6 py-4">{{ item.type }}</td>
    <td class="px-6 py-4">{{ item.description }}</td>
    <td class="px-6 py-4">{{ item.description2 }}</td>
    <td class="px-6 py-4">{{ item.unitPrice }}</td>
    <td class="px-6 py-4">{{ item.unitCost }}</td>
    <td class="px-6 py-4">{{ item.inventory }}</td>
    <td class="px-6 py-4">{{ item.vendorNo }}</td>
    <td class="px-6 py-4">{{ item.itemCategoryCode }}</td>
    <td class="px-6 py-4 text-right space-x-2">
      <button
        @click.stop="emit('click')"
        class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit
      </button>
      <button
        @click.stop="emit('delete', item.item_no)"
        class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
