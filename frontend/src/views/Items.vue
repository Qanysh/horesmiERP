<script setup>
import { ref, onMounted } from 'vue';
import API_URL from "@/config/index.js"
import axios from 'axios';
import ItemsTable from '@/components/ItemsTable.vue';

const items = ref([]);   // Array to store the fetched customers
const error = ref(null);      // Variable to store error messages
const loading = ref();    // Variable to track loading state

// Function to fetch customers data 
const fetchItems = async () => {
    loading.value = true
    try {
        const response = await axios.get(`${API_URL}/items`);
        items.value = response.data; // Store the response data in the 'customers' array
    } catch (err) {
        error.value = 'Error fetching data'; // Set error message in case of failure
        console.error(err);
    } finally {
        loading.value = false; // Stop loading once data is fetched or an error occurs
    }
};

// Fetch data when the component is mounted
onMounted(() => {
    fetchItems();
});
</script>



<template>
    <div class="relative overflow-x-auto container mx-auto">
        <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Item Number</th>
                    <th scope="col" class="px-6 py-3">Item Type</th>
                    <th scope="col" class="px-6 py-3">Description</th>
                    <th scope="col" class="px-6 py-3">Item category code</th>
                    <th scope="col" class="px-6 py-3">Size</th>
                    <th scope="col" class="px-6 py-3">Weight</th>
                    <th scope="col" class="px-6 py-3">Quantity</th>
                    <th scope="col" class="px-6 py-3">Unit Cost</th>
                    <th scope="col" class="px-6 py-3">Price</th>

                </tr>
            </thead>

            <!-- Customer Table - v-for for rendering customer rows -->
            <ItemsTable v-for="item in items" :key="item.id" :item />
        </table>
    </div>
</template>
