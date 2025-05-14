<script setup>
defineProps(["item", "deleteVendor"]);

const emit = defineEmits(["edit-vendor", "delete-vendor"]);
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
      <td class="px-6 py-4 flex gap-2">
        <button
          @click="deleteVendor(item.no)"
          class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</template>
