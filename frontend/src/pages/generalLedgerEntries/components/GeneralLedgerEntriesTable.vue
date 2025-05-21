<script setup>
defineProps({
  entries: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Entry No
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Posting Date
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Document No
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Account
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
            Amount
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-if="loading">
          <tr v-for="i in 5" :key="i">
            <td v-for="j in 6" :key="j" class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          </tr>
        </template>
        <template v-else-if="entries.length === 0">
          <tr>
            <td colspan="6" class="px-6 py-4 text-center text-gray-500">
              No entries found
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="entry in entries"
            :key="entry.entryNo"
            class="bg-white border-b hover:bg-gray-50"
          >
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ entry.entryNo }}
            </td>
            <td class="px-6 py-4">
              {{ new Date(entry.postingDate).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4">
              {{ entry.documentNo }}
            </td>
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ entry.accountNo }}</div>
              <div class="text-xs text-gray-500">{{ entry.accountName }}</div>
            </td>
            <td class="px-6 py-4">
              {{ entry.description }}
            </td>
            <td class="px-6 py-4 text-right font-medium whitespace-nowrap">
              <span
                :class="{
                  'text-green-600': parseFloat(entry.amount) > 0,
                  'text-red-600': parseFloat(entry.amount) < 0,
                }"
              >
                {{ parseFloat(entry.amount).toFixed(2) }}
              </span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
