// store.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const useGeneralLedgerEntriesStore = defineStore(
  "generalLedgerEntries",
  () => {
    const entries = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const searchQuery = ref("");

    const filteredEntries = computed(() => {
      if (!searchQuery.value) return entries.value;

      const query = searchQuery.value.toLowerCase();
      return entries.value.filter((entry) => {
        return (
          String(entry.entryNo).includes(query) ||
          entry.documentNo?.toLowerCase().includes(query) ||
          entry.accountNo?.toLowerCase().includes(query) ||
          entry.accountName?.toLowerCase().includes(query) ||
          entry.description?.toLowerCase().includes(query)
        );
      });
    });

    const fetchGeneralLedgerEntries = async () => {
      loading.value = true;
      try {
        const response = await axios.get(`${API_URL}/api/generalLedgerEntries`);
        entries.value = response.data;
      } catch (err) {
        error.value = "Failed to fetch general ledger entries";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const printGeneralLedgerEntries = () => {
      window.open(
        "http://localhost:3000/api/reports/generalLedgerEntries",
        "_blank"
      );
    };

    return {
      entries,
      filteredEntries,
      loading,
      error,
      searchQuery,
      fetchGeneralLedgerEntries,
      printGeneralLedgerEntries,
    };
  }
);
