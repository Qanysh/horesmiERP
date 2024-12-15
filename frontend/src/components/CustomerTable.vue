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
                {{ customer.Id }}
            </th>
            <td class="px-6 py-4">
                {{ customer.Customers }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Date }}
            </td>
            <td class="px-6 py-4">
                {{ customer.Status }}
            </td>
        </tr>

    </tbody>
</template>