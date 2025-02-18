<script setup>
import { onMounted } from "vue";
import { useItemStore } from "@/stores/useItemStore";
import ItemModal from "@/components/ItemModal.vue";

const itemStore = useItemStore();

onMounted(async () => {
  await itemStore.fetchItems();
});
</script>

<template>
  <div class="relative overflow-x-auto container mx-auto">
    <table
      class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
    >
      <thead class="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3">Item Number</th>
          <th scope="col" class="px-6 py-3">Item Type</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Category</th>
          <th scope="col" class="px-6 py-3">Size</th>
          <th scope="col" class="px-6 py-3">Weight</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Unit Cost</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in itemStore.filteredItems" :key="item.item_no">
          <td class="px-6 py-3">{{ item.item_no }}</td>
          <td class="px-6 py-3">{{ item.item_type }}</td>
          <td class="px-6 py-3">{{ item.description }}</td>
          <td class="px-6 py-3">{{ item.item_category_code }}</td>
          <td class="px-6 py-3">{{ item.size }}</td>
          <td class="px-6 py-3">{{ item.weight }}</td>
          <td class="px-6 py-3">{{ item.quantity }}</td>
          <td class="px-6 py-3">${{ item.unit_cost }}</td>
          <td class="px-6 py-3">${{ item.price }}</td>
          <td class="px-6 py-3">
            <button
              @click="itemStore.fetchItemById(item.item_no)"
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Подробнее
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Подключение модального окна -->
    <ItemModal
      :isOpen="itemStore.isModalOpen"
      :item="itemStore.selectedItem"
      :closeModal="itemStore.closeModal"
    />
  </div>
</template>
