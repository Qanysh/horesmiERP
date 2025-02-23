<script setup>
defineProps({
  customer: Object,
});
</script>

<template>
  <tbody>
    <tr class="bg-white border-b">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {{ customer.no }}
      </th>
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
      <td>
        <button
          @click="$emit('delete')"
          class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</template>
