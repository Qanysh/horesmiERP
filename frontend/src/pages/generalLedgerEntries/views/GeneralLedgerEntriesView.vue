<script setup>
import { onMounted } from "vue";
import { useGeneralLedgerEntriesStore } from "@/pages/generalLedgerEntries/store/useGeneralLedgerEntriesStore.js";
import GeneralLedgerEntriesTable from "@/pages/generalLedgerEntries/components/GeneralLedgerEntriesTable.vue";
import GeneralLedgerEntriesSearch from "@/pages/generalLedgerEntries/components/GeneralLedgerEntriesSearch.vue";

const store = useGeneralLedgerEntriesStore();

onMounted(() => {
  store.fetchGeneralLedgerEntries();
});

// Функция для печати
const handlePrint = () => {
  window.open(
    "http://localhost:3000/api/reports/generalLedgerEntries",
    "_blank"
  );
};
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <GeneralLedgerEntriesSearch />

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="store.error" class="p-4 bg-red-50 text-red-600">
        {{ store.error }}
      </div>

      <GeneralLedgerEntriesTable
        :entries="store.filteredEntries"
        :loading="store.loading"
      />
    </div>
    <div class="flex justify-end gap-4 mt-6">
      <button
        @click="handlePrint"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Post & Print
      </button>
    </div>
  </div>
</template>
