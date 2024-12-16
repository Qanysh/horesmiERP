<script setup>
defineProps({
    customer: Object,
});
</script>

<template>

    <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
        </tr>
    </tbody>
</template>