<script setup>
import CustomerTable from '@/components/CustomerTable.vue'
import CustomerData from '@/CustomerData.json'
import { ref } from 'vue'

const customers = ref(CustomerData)
</script>

<template>
    <div class="relative overflow-x-auto container mx-auto">
        <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Number</th>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Balance</th>
                    <th scope="col" class="px-6 py-3">Credit limit</th>
                    <th scope="col" class="px-6 py-3">Total sales</th>
                    <th scope="col" class="px-6 py-3">Costs</th>
                    <th scope="col" class="px-6 py-3">Address</th>
                    <th scope="col" class="px-6 py-3">Country</th>
                    <th scope="col" class="px-6 py-3">City</th>
                    <th scope="col" class="px-6 py-3">Phone</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Contact name</th>
                </tr>
            </thead>
            <CustomerTable v-for:="customer in customers" :key="customer.id" :customer="customer" />
        </table>
    </div>

</template>