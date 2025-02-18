<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white min-h-screen">
      <!-- Header -->
      <header class="p-4 border-b">
        <div class="flex items-center gap-2 mb-4">
          <button class="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <h1 class="text-lg">106001 - Fabrikam, Inc.</h1>
        </div>

        <!-- Alert Banner -->
        <div class="bg-cyan-50 p-3 mb-4 flex items-center justify-between">
          <span class="text-sm text-cyan-800">
            Start validating data in documents and journals while you work.
            Messages are shown in the Document Check FactBox.
          </span>
          <div class="flex gap-2">
            <button class="text-sm text-cyan-600 hover:underline">
              Enable this for me
            </button>
            <span class="text-sm text-cyan-600">|</span>
            <button class="text-sm text-cyan-600 hover:underline">
              Don't show again
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex gap-4 border-b">
          <button class="px-4 py-2 text-cyan-600 border-b-2 border-cyan-600">
            Home
          </button>
          <button class="px-4 py-2">Prepare</button>
          <button class="px-4 py-2">Print/Send</button>
          <button class="px-4 py-2">Request Approval</button>
          <button class="px-4 py-2">Order</button>
        </nav>

        <!-- Action Buttons -->
        <div class="flex gap-2 mt-4">
          <button
            class="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-50"
          >
            <span>Post...</span>
          </button>
          <button
            class="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-50"
          >
            <span>Release</span>
          </button>
          <button
            class="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-50"
          >
            <span>Create Whse. Receipt</span>
          </button>
          <button
            class="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-50"
          >
            <span>Create Inventory Put-away/Pick...</span>
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-4">
        <!-- General Section -->
        <section class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-medium">General</h2>
            <button class="text-sm text-gray-600">Show more</button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div>
                <label class="text-sm text-gray-600">Vendor Name</label>
                <div class="mt-1">Fabrikam, Inc.</div>
              </div>
              <div>
                <label class="text-sm text-gray-600">Contact</label>
                <div class="mt-1">Krystal York</div>
              </div>
              <div>
                <label class="text-sm text-gray-600">Document Date</label>
                <div class="mt-1">08.04.2024</div>
              </div>
              <div>
                <label class="text-sm text-gray-600">Vendor Invoice No.</label>
                <div class="mt-1">5755</div>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="text-sm text-gray-600">Vendor Shipment No.</label>
                <div class="mt-1"></div>
              </div>
              <div>
                <label class="text-sm text-gray-600">Status</label>
                <div class="mt-1 text-green-600">Open</div>
              </div>
              <div>
                <label class="text-sm text-gray-600"
                  >Linked with E-Document</label
                >
                <div class="mt-1">
                  <input type="checkbox" class="rounded border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Lines Section -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <div class="flex gap-4">
              <button class="text-cyan-600">Lines</button>
              <button>Manage</button>
              <button>Line</button>
              <button>Functions</button>
              <button>Order</button>
            </div>
          </div>

          <!-- Table -->
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left">Type</th>
                <th class="px-4 py-2 text-left">No.</th>
                <th class="px-4 py-2 text-left">Description</th>
                <th class="px-4 py-2 text-right">Quantity</th>
                <th class="px-4 py-2 text-right">Unit Cost</th>
                <th class="px-4 py-2 text-right">Line Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t">
                <td class="px-4 py-2">Item</td>
                <td class="px-4 py-2">1096-S</td>
                <td class="px-4 py-2">ATHENS Desk</td>
                <td class="px-4 py-2 text-right">7</td>
                <td class="px-4 py-2 text-right">506.60</td>
                <td class="px-4 py-2 text-right">3,546.20</td>
              </tr>
            </tbody>
          </table>

          <!-- Totals -->
          <div class="mt-4 grid grid-cols-2 gap-8">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm">Subtotal Excl. VAT (GBP)</span>
                <span class="text-sm">3,546.20</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Inv. Discount Amount (GBP)</span>
                <span class="text-sm">0.00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Invoice Discount %</span>
                <span class="text-sm">0</span>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm">Total Excl. VAT (GBP)</span>
                <span class="text-sm">3,546.20</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Total VAT (GBP)</span>
                <span class="text-sm">0.00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Total Incl. VAT (GBP)</span>
                <span class="text-sm">3,546.20</span>
              </div>
            </div>
          </div>
          <button
            @click="closeModal"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  isOpen: Boolean,
  item: Object,
  closeModal: Function,
});
</script>
