<script setup>
import { ref, onMounted, watch } from 'vue'
import { useGeneralLedgerEntriesStore } from '@/stores/generalLedgerEntries'
import GeneralLedgerEntriesTable from '@/components/generalLedgerEntries/GeneralLedgerEntriesTable.vue'
import { Button } from '@/components/ui/button'

const store = useGeneralLedgerEntriesStore()
const documentTypeFilter = ref('all')
const loading = ref(false)

onMounted(async () => {
  await store.fetchEntries()
})

watch(documentTypeFilter, async (newFilter) => {
  await store.fetchEntries(newFilter)
})

const handlePostAndPrint = async () => {
  try {
    loading.value = true
    const blob = await store.downloadPdf(documentTypeFilter.value)

    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
    link.download = `general_ledger_${
      documentTypeFilter.value === 'purchase'
        ? 'purchases'
        : documentTypeFilter.value === 'sale'
          ? 'sales'
          : 'all'
    }.pdf`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (err) {
    console.error('Download error:', err)
    alert(err.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6 p-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">General Ledger Entries</h2>
      <Button
        @click="handlePostAndPrint"
        :disabled="loading || store.loading"
        class="min-w-[150px]"
      >
        Post & Print
        {{
          documentTypeFilter === 'purchase'
            ? 'Purchases'
            : documentTypeFilter === 'sale'
              ? 'Sales'
              : 'All'
        }}
      </Button>
    </div>

    <GeneralLedgerEntriesTable
      v-model:documentTypeFilter="documentTypeFilter"
      :entries="store.entries"
      :loading="store.loading"
    />
  </div>
</template>
