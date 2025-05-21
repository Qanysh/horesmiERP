<script setup>
import { useGeneralLedgerEntriesStore } from "@/pages/generalLedgerEntries/store/useGeneralLedgerEntriesStore.js";

const store = useGeneralLedgerEntriesStore();
</script>

<template>
  <div
    class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6"
  >
    <div class="w-full md:w-1/2">
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          v-model="store.searchQuery"
          type="text"
          placeholder="Search entries..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  </div>
</template>
