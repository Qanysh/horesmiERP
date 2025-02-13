<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import CustomerTable from '@/components/tables/Customer/CustomerTableContent.vue';
import API_URL from "@/config/index.js";

const customers = ref([]);
const filteredCustomers = ref([]);
const searchQuery = ref('');
const error = ref(null);
const loading = ref();

const fetchCustomers = async () => {
    loading.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 200));
        const response = await axios.get(`${API_URL}/customers`);
        customers.value = response.data;
        filterCustomers();
    } catch (err) {
        error.value = 'Error fetching data';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const filterCustomers = () => {
    filteredCustomers.value = customers.value.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
};

watch(searchQuery, () => {
    filterCustomers();
});

onMounted(() => {
    fetchCustomers();
});
</script>

<template>
    <div class="container mx-auto">
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search by email or name"
                class="w-full rounded-md border px-4 py-2 text-gray-700 " />
        </div>

        <div class="relative overflow-x-auto">
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
                <template v-if="loading">
                    <tr v-for="i in 5" :key="i" class="animate-pulse">
                        <td v-for="j in 12" :key="j" class="px-6 py-3">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <CustomerTable v-for="customer in filteredCustomers" :key="customer.id" :customer="customer" />
                </template>
            </table>
        </div>
    </div>
</template>
