<script setup>
defineProps({
  item: Object,
});
</script>

<template>
  <tbody>
    <tr class="bg-white border-b">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {{ item.no }}
      </th>
      <td class="px-6 py-4">{{ item.name }}</td>
      <td class="px-6 py-4">{{ item.balance }}</td>
      <td class="px-6 py-4">{{ item.creditLimit }}</td>
      <td class="px-6 py-4">{{ item.totalSales }}</td>
      <td class="px-6 py-4">{{ item.costs }}</td>
      <td class="px-6 py-4">{{ item.address }}</td>
      <td class="px-6 py-4">{{ item.country }}</td>
      <td class="px-6 py-4">{{ item.city }}</td>
      <td class="px-6 py-4">{{ item.phone }}</td>
      <td class="px-6 py-4">{{ item.email }}</td>
      <td class="px-6 py-4">{{ item.contactName }}</td>
    </tr>
  </tbody>
</template>
