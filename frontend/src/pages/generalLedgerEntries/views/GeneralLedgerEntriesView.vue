<script setup>
import { onMounted } from "vue";
import { useGeneralLedgerEntriesStore } from "@/pages/generalLedgerEntries/store/useGeneralLedgerEntriesStore.js";
import GeneralLedgerEntriesTable from "@/pages/generalLedgerEntries/components/GeneralLedgerEntriesTable.vue";
import GeneralLedgerEntriesSearch from "@/pages/generalLedgerEntries/components/GeneralLedgerEntriesSearch.vue";

const store = useGeneralLedgerEntriesStore();

onMounted(() => {
  store.fetchGeneralLedgerEntries();
});
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
  </div>
</template>
