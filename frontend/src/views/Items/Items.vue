<script setup>
import { onMounted } from "vue";
import { useItemStore } from "@/stores/useItemStore"; // Import the Pinia store
import ItemsTable from "@/components/tables/Item/ItemsTableContent.vue"; // Adjust the import according to your structure

// Access the store
const itemStore = useItemStore();

// Fetch the items when the component is mounted
onMounted(async () => {
  await itemStore.fetchItems();
});
</script>

<template>
  <div class="relative overflow-x-auto container mx-auto">
    <div class="mb-4">
      <input
        v-model="itemStore.searchQuery"
        type="text"
        placeholder="Search by item type"
        class="w-full rounded-md border px-4 py-2 text-gray-700"
      />
    </div>
    <table
      class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
    >
      <thead
        class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      >
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

      <!-- Loading state -->
      <template v-if="itemStore.loading">
        <tr v-for="i in 5" :key="i" class="animate-pulse">
          <td v-for="j in 9" :key="j" class="px-6 py-3">
            <div class="h-4 bg-gray-200 rounded"></div>
          </td>
        </tr>
      </template>

      <!-- Display filtered items -->
      <template v-else>
        <ItemsTable
          v-for="item in itemStore.filteredItems"
          :key="item.id"
          :item="item"
        />
      </template>
    </table>
  </div>
</template>
