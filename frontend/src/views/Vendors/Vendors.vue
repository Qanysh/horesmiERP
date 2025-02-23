<script setup>
import { onMounted } from "vue";
import { useVendorsStore } from "@/stores/useVendors";
import VendorsTableContent from "@/components/tables/Vendors/VendorsTableContent.vue";

const vendorsStore = useVendorsStore();

onMounted(() => {
  vendorsStore.fetchVendors();
});
</script>

<template>
  <div class="container mx-auto">
    <div class="relative overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3">Number</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Balance</th>
            <th scope="col" class="px-6 py-3">Credit limit</th>
            <th scope="col" class="px-6 py-3">Total sales</th>
            <th scope="col" class="px-6 py-3">Costs</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Country</th>
            <th scope="col" class="px-6 py-3">City</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Contact name</th>
          </tr>
        </thead>

        <template v-if="vendorsStore.loading">
          <tr v-for="i in 5" :key="i" class="animate-pulse">
            <td v-for="j in 12" :key="j" class="px-6 py-3">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <VendorsTableContent
            v-for="vendor in vendorsStore.filteredVendors"
            :key="vendor.no"
            :item="vendor"
          />
        </template>
      </table>
    </div>
  </div>
</template>
