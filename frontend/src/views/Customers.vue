<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CustomerTable from '@/components/CustomerTable.vue';
import API_URL from "@/config/index.js";


// Reactive variables
const customers = ref([]);   // Array to store the fetched customers
const error = ref(null);      // Variable to store error messages
const loading = ref();    // Variable to track loading state

// Function to fetch customers data 
const fetchCustomers = async () => {
    loading.value = true
    try {
        const response = await axios.get(`${API_URL}/customers`);
        customers.value = response.data; // Store the response data in the 'customers' array
    } catch (err) {
        error.value = 'Error fetching data'; // Set error message in case of failure
        console.error(err);
    } finally {
        loading.value = false; // Stop loading once data is fetched or an error occurs
    }
};

// Fetch data when the component is mounted
onMounted(() => {
    fetchCustomers();
});
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

            <!-- Customer Table - v-for for rendering customer rows -->
            <CustomerTable v-for="customer in customers" :key="customer.id" :customer />
        </table>
    </div>
</template>
