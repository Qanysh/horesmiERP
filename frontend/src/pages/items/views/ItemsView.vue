<script setup>
import { onMounted, ref } from "vue";
import { useItemsStore } from "@/pages/items/stores/useItemStore";
import ItemTable from "@/pages/items/components/ItemTable.vue";
import ItemModal from "@/pages/items/components/ItemModal.vue";
import ItemSearch from "@/pages/items/components/ItemSearch.vue";

const itemsStore = useItemsStore();
const isModalOpen = ref(false);

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const addItem = async (itemData) => {
  try {
    await itemsStore.addItem(itemData);
    closeModal();
  } catch (error) {
    console.error("Error adding item", error);
  }
};

const deleteItem = async (itemNo) => {
  if (confirm("Are you sure you want to delete this item?")) {
    await itemsStore.deleteItem(itemNo);
  }
};

onMounted(() => {
  itemsStore.fetchItems();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <ItemSearch
      v-model:searchQuery="itemsStore.searchQuery"
      @openModal="openModal"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Number
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Unit Price
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Inventory
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="itemsStore.loading">
            <tr v-for="i in 5" :key="i">
              <td v-for="j in 6" :key="j" class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <ItemTable
              v-for="item in itemsStore.filteredItems"
              :key="item.no"
              :item="item"
              @delete="deleteItem"
            />
          </template>
        </tbody>
      </table>
    </div>

    <ItemModal v-if="isModalOpen" @submit="addItem" @close="closeModal" />
  </div>
</template>
