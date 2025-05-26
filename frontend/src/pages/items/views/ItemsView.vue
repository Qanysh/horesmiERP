<script setup>
import { ref, onMounted } from "vue";
import { useItemsStore } from "@/pages/items/stores/useItemStore";
import ItemTable from "@/pages/items/components/ItemTable.vue";
import ItemModal from "@/pages/items/components/ItemModal.vue";
import ItemSearch from "@/pages/items/components/ItemSearch.vue";

const itemsStore = useItemsStore();
const isModalOpen = ref(false);
const editingItem = ref(null);

const openModal = (item = null) => {
  editingItem.value = item;
  isModalOpen.value = true;
};
const closeModal = () => {
  editingItem.value = null;
  isModalOpen.value = false;
};

const handleSubmit = async (itemData) => {
  if (editingItem.value) {
    await itemsStore.updateItem(itemData);
  } else {
    await itemsStore.addItem(itemData);
  }
  closeModal();
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
      @openModal="() => openModal()"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th class="px-6 py-3">Number</th>
            <th class="px-6 py-3">Type</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3">Description 2</th>
            <th class="px-6 py-3">Unit Price</th>
            <th class="px-6 py-3">Unit Cost</th>
            <th class="px-6 py-3">Inventory</th>
            <th class="px-6 py-3">Vendor No</th>
            <th class="px-6 py-3">Category Code</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
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
              :key="item.item_no"
              :item="item"
              @delete="deleteItem"
              @click="() => openModal(item)"
            />
          </template>
        </tbody>
      </table>
    </div>

    <ItemModal
      v-if="isModalOpen"
      :modelValue="editingItem"
      @submit="handleSubmit"
      @close="closeModal"
    />
  </div>
</template>
