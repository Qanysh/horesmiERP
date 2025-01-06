<script setup>
import { ref, onMounted, watch } from 'vue';
import API_URL from "@/config/index.js"
import axios from 'axios';
import ItemsTable from '@/components/tables/Item/ItemsTableContent.vue';
import { filterItems } from '@/utils/filter';


const items = ref([]);
const error = ref(null);
const loading = ref()
const searchQuery = ref('');
const filteredItems = ref([]);


const fetchItems = async () => {
    loading.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 200))
        const response = await axios.get(`${API_URL}/items`);
        items.value = response.data;
        filterItems()
    } catch (err) {
        error.value = 'Error fetching data';
        console.error(err);
    }
    finally {
        loading.value = false
    }
};

const filterItemsData = () => {
    filteredItems.value = filterItems(items.value, searchQuery.value);
};

watch(searchQuery, () => {
    filterItemsData();
})

onMounted(async () => {
    await fetchItems();
    filteredItems.value = items.value
});

</script>



<template>
    <div class="relative overflow-x-auto container mx-auto">
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search by item type"
                class="w-full rounded-md border px-4 py-2 text-gray-700 " />
        </div>
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
            <template v-if="loading">
                <tr v-for="i in 5" :key="i" class="animate-pulse">
                    <td v-for="j in 12" :key="j" class="px-6 py-3">
                        <div class="h-4 bg-gray-200 rounded"></div>
                    </td>
                </tr>
            </template>
            <template v-else>
                <ItemsTable v-for="item in filteredItems" :key="item.id" :item="item" />
            </template>
        </table>
    </div>
</template>
