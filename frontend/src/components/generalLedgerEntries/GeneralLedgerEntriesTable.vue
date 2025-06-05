<script setup>
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const props = defineProps({
  entries: { type: Array, required: true },
  documentTypeFilter: { type: String, default: 'all' },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:documentTypeFilter'])

const filteredEntries = computed(() => {
  if (props.documentTypeFilter === 'all') return props.entries

  return props.entries.filter((entry) => {
    const filterType = props.documentTypeFilter.toLowerCase()
    const entryType = entry.documentType?.toLowerCase() || ''

    if (filterType === 'purchase') {
      return entryType.includes('purchase')
    } else if (filterType === 'sale') {
      return entryType.includes('sale')
    }
    return false
  })
})

const getDocumentTypeBadgeVariant = (documentType) => {
  const type = documentType?.toLowerCase() || ''
  if (type.includes('purchase')) return 'default'
  if (type.includes('sale')) return 'secondary'
  return 'outline'
}

const getDisplayDocumentType = (documentType) => {
  if (!documentType) return '-'
  const type = documentType.toLowerCase()
  if (type.includes('purchase')) return 'Purchase'
  if (type.includes('sale')) return 'Sale'
  return documentType
}
</script>

<template>
  <div class="h-full flex flex-col space-y-4">
    <div class="flex items-center gap-4">
      <Select
        :modelValue="documentTypeFilter"
        :disabled="loading"
        @update:modelValue="emit('update:documentTypeFilter', $event)"
      >
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Filter by document type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Entries</SelectItem>
          <SelectItem value="purchase">Purchase Only</SelectItem>
          <SelectItem value="sale">Sale Only</SelectItem>
        </SelectContent>
      </Select>
      <div class="text-sm text-muted-foreground">Showing {{ filteredEntries.length }} entries</div>
    </div>

    <div class="relative flex-1 overflow-auto">
      <Table class="border-b">
        <TableHeader class="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <TableRow class="hover:bg-transparent">
            <TableHead>Entry No</TableHead>
            <TableHead>Posting Date</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead>Document No</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Account No</TableHead>
            <TableHead>Account Name</TableHead>

            <TableHead>Balance</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead class="text-right w-[50px]">
              <span class="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filteredEntries.length === 0">
            <TableCell colspan="12" class="text-center py-4">
              {{ loading ? 'Loading entries...' : 'No entries found' }}
            </TableCell>
          </TableRow>
          <TableRow v-for="entry in filteredEntries" :key="entry.entryNo">
            <TableCell class="font-medium">{{ entry.entryNo || '-' }}</TableCell>
            <TableCell>{{
              entry.postingDate ? new Date(entry.postingDate).toLocaleDateString() : '-'
            }}</TableCell>
            <TableCell>
              <Badge :variant="getDocumentTypeBadgeVariant(entry.documentType)">
                {{ getDisplayDocumentType(entry.documentType) }}
              </Badge>
            </TableCell>
            <TableCell>{{ entry.documentNo || '-' }}</TableCell>
            <TableCell>{{ entry.description || '-' }}</TableCell>
            <TableCell>{{ entry.accountNo || '-' }}</TableCell>
            <TableCell>{{ entry.accountName || '-' }}</TableCell>

            <TableCell>{{ entry.amount || '0.00' }}</TableCell>
            <TableCell>{{ entry.quantity || '0.00' }}</TableCell>
            <TableCell class="text-right"> </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
