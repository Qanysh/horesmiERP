<script setup>
import { onMounted } from "vue";
import { useItemStore } from "../stores/useItemStore";
import ItemTable from "../components/ItemTable.vue";
import ItemModal from "../components/ItemModal.vue";
import ItemSearch from "../components/ItemSearch.vue";

const itemStore = useItemStore();

const viewItem = (itemNo) => {
  itemStore.fetchItemById(itemNo);
};

onMounted(async () => {
  await itemStore.fetchItems();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <ItemSearch v-model:searchQuery="itemStore.searchQuery" />

    <div class="relative overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Number
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
              Type
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              inventory
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              unitCost
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              unitPrice
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              vendorNo
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
          <template v-if="itemStore.loading">
            <tr v-for="i in 5" :key="i">
              <td v-for="j in 10" :key="j" class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <ItemTable
              v-for="item in itemStore.filteredItems"
              :key="item.item_no"
              :item="item"
              @view="viewItem"
            />
          </template>
        </tbody>
      </table>
    </div>
  </div>

  <ItemModal
    :isOpen="itemStore.isModalOpen"
    :item="itemStore.selectedItem"
    :closeModal="itemStore.closeModal"
  />
</template>
