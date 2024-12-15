<script setup>
import { defineProps } from 'vue'



defineProps({
    customer: Object
})
</script>

<template>
    <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ customer.Number }}
            </th>
            <td class="px-6 py-4">
                {{ customer.Name }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Balance }}
            </td>
            <td class="px-6 py-4">
                {{ customer.CreditLimit }}
            </td>
            <td class="px-6 py-4">
                {{ customer.TotalSales }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Costs }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Address }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Country }}
            </td>
            <td class="px-6 py-4">
                {{ customer.City }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Phone }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Email }}
            </td>
            <td class="px-6 py-4">
                {{ customer.ContactName }}
            </td>
        </tr>

    </tbody>
</template>