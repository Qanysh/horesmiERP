<script setup>
defineProps({
  item: Object,
});
</script>

<template>
  <tbody>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {{ item.item_no }}
      </th>
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
      <td class="px-6 py-4">
        {{ item.unit_cost }}
      </td>
      <td class="px-6 py-4">
        {{ item.price }}
      </td>
    </tr>
  </tbody>
</template>
