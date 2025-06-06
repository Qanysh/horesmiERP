<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useVendorsStore } from '@/stores/vendors'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

const props = defineProps(['open'])
const emit = defineEmits(['update:open', 'saved'])
const productsStore = useProductsStore()
const vendorsStore = useVendorsStore()

const form = ref({
  product_no: '',
  description: '',
  description2: '',
  type: '',
  inventory: '',
  createdFromNonstockProduct: 0,
  substitutesExist: 0,
  stockkeepingUnitExists: 0,
  assemblyBOM: '',
  productionBOMNo: '',
  routingNo: '',
  baseUnitOfMeasure: '',
  shelfNo: '',
  costingMethod: '',
  costIsAdjusted: 0,
  standardCost: '',
  unitCost: '',
  lastDirectCost: '',
  priceProfitCalculation: '',
  profitPercent: '',
  unitPrice: '',
  inventoryPostingGroup: '',
  genProdPostingGroup: '',
  vatProdPostingGroup: '',
  productDiscGroup: '',
  vendorNo: '',
  vendorProductNo: '',
  tariffNo: '',
  searchDescription: '',
  overheadRate: '',
  indirectCostPercent: '',
  productCategoryCode: '',
  blocked: 0,
  salesUnitOfMeasure: '',
  replenishmentSystem: '',
  purchUnitOfMeasure: '',
  leadTimeCalculation: '',
  manufacturingPolicy: '',
  flushingMethod: '',
  assemblyPolicy: '',
  productTrackingCode: '',
  defaultDeferralTemplateCode: '',
  isArchived: 0,
})

const errors = ref({})

onMounted(async () => {
  await vendorsStore.fetchVendors()
})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.product_no.trim()) {
    errors.value.product_no = 'Product No is required'
    isValid = false
  }
  if (!form.value.description.trim()) {
    errors.value.description = 'Description is required'
    isValid = false
  }

  const numericFields = [
    'inventory',
    'standardCost',
    'unitCost',
    'lastDirectCost',
    'profitPercent',
    'unitPrice',
    'overheadRate',
    'indirectCostPercent',
  ]

  numericFields.forEach((field) => {
    const value = form.value[field]
    if (value !== '' && isNaN(parseFloat(value))) {
      errors.value[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} must be a valid number`
      isValid = false
    }
  })

  return isValid
}

const transformFormData = () => {
  const data = { ...form.value }

  const numericFields = [
    'inventory',
    'standardCost',
    'unitCost',
    'lastDirectCost',
    'profitPercent',
    'unitPrice',
    'overheadRate',
    'indirectCostPercent',
  ]

  numericFields.forEach((field) => {
    if (data[field] === '') {
      data[field] = null
    } else {
      data[field] = parseFloat(data[field])
    }
  })

  data.createdFromNonstockProduct = Boolean(data.createdFromNonstockProduct)
  data.substitutesExist = Boolean(data.substitutesExist)
  data.stockkeepingUnitExists = Boolean(data.stockkeepingUnitExists)
  data.costIsAdjusted = Boolean(data.costIsAdjusted)
  data.blocked = Boolean(data.blocked)
  data.isArchived = Boolean(data.isArchived)

  return data
}

const handleSubmit = async () => {
  if (!validateForm()) {
    alert('Please fix the form errors before submitting')
    return
  }

  try {
    const transformedData = transformFormData()
    await productsStore.createProduct(transformedData)
    emit('saved')
    emit('update:open', false)
    form.value = {
      product_no: '',
      description: '',
      description2: '',
      type: '',
      inventory: '',
      createdFromNonstockProduct: 0,
      substitutesExist: 0,
      stockkeepingUnitExists: 0,
      assemblyBOM: '',
      productionBOMNo: '',
      routingNo: '',
      baseUnitOfMeasure: '',
      shelfNo: '',
      costingMethod: '',
      costIsAdjusted: 0,
      standardCost: '',
      unitCost: '',
      lastDirectCost: '',
      priceProfitCalculation: '',
      profitPercent: '',
      unitPrice: '',
      inventoryPostingGroup: '',
      genProdPostingGroup: '',
      vatProdPostingGroup: '',
      productDiscGroup: '',
      vendorNo: '',
      vendorProductNo: '',
      tariffNo: '',
      searchDescription: '',
      overheadRate: '',
      indirectCostPercent: '',
      productCategoryCode: '',
      blocked: 0,
      salesUnitOfMeasure: '',
      replenishmentSystem: '',
      purchUnitOfMeasure: '',
      leadTimeCalculation: '',
      manufacturingPolicy: '',
      flushingMethod: '',
      assemblyPolicy: '',
      productTrackingCode: '',
      defaultDeferralTemplateCode: '',
      isArchived: 0,
    }
  } catch (error) {
    console.error('Error creating product:', error)
    alert(`Failed to create product: ${error.response?.data?.message || error.message}`)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogDescription>Enter product details below</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="product_no" class="text-right">Product No</label>
          <Input
            id="product_no"
            v-model="form.product_no"
            class="col-span-3"
            :class="{ 'border-red-500': errors.product_no }"
          />
          <div v-if="errors.product_no" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.product_no }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="description" class="text-right">Description</label>
          <Input
            id="description"
            v-model="form.description"
            class="col-span-3"
            :class="{ 'border-red-500': errors.description }"
          />
          <div v-if="errors.description" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.description }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="description2" class="text-right">Description 2</label>
          <Input id="description2" v-model="form.description2" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="type" class="text-right">Type</label>
          <Input id="type" v-model="form.type" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="inventory" class="text-right">Inventory</label>
          <Input
            id="inventory"
            v-model="form.inventory"
            type="number"
            class="col-span-3"
            :class="{ 'border-red-500': errors.inventory }"
          />
          <div v-if="errors.inventory" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.inventory }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="standardCost" class="text-right">Standard Cost</label>
          <Input
            id="standardCost"
            v-model="form.standardCost"
            type="number"
            step="1"
            class="col-span-3"
            :class="{ 'border-red-500': errors.standardCost }"
          />
          <div v-if="errors.standardCost" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.standardCost }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="unitCost" class="text-right">Unit Cost</label>
          <Input
            id="unitCost"
            v-model="form.unitCost"
            type="number"
            step="1"
            class="col-span-3"
            :class="{ 'border-red-500': errors.unitCost }"
          />
          <div v-if="errors.unitCost" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.unitCost }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="lastDirectCost" class="text-right">Last Direct Cost</label>
          <Input
            id="lastDirectCost"
            v-model="form.lastDirectCost"
            type="number"
            step="1"
            class="col-span-3"
            :class="{ 'border-red-500': errors.lastDirectCost }"
          />
          <div v-if="errors.lastDirectCost" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.lastDirectCost }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="unitPrice" class="text-right">Unit Price</label>
          <Input
            id="unitPrice"
            v-model="form.unitPrice"
            type="number"
            step="1"
            class="col-span-3"
            :class="{ 'border-red-500': errors.unitPrice }"
          />
          <div v-if="errors.unitPrice" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.unitPrice }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="vendorNo" class="text-right">Vendor</label>
          <Select v-model="form.vendorNo">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select a vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vendors</SelectLabel>
                <SelectItem
                  v-for="vendor in vendorsStore.vendors"
                  :key="vendor.BIN"
                  :value="vendor.BIN"
                >
                  {{ vendor.BIN }} - {{ vendor.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="productCategoryCode" class="text-right">Category Code</label>
          <Input id="productCategoryCode" v-model="form.productCategoryCode" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="searchDescription" class="text-right">Search Description</label>
          <Input id="searchDescription" v-model="form.searchDescription" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="profitPercent" class="text-right">Profit Percent</label>
          <Input
            id="profitPercent"
            v-model="form.profitPercent"
            type="number"
            step="1"
            class="col-span-3"
            :class="{ 'border-red-500': errors.profitPercent }"
          />
          <div v-if="errors.profitPercent" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.profitPercent }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="overheadRate" class="text-right">Overhead Rate</label>
          <Input
            id="overheadRate"
            v-model="form.overheadRate"
            type="number"
            step="1"
            class="col-span-3"
            :class="{ 'border-red-500': errors.overheadRate }"
          />
          <div v-if="errors.overheadRate" class="col-span-3 col-start-2 text-red-500 text-sm">
            {{ errors.overheadRate }}
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="indirectCostPercent" class="text-right">Indirect Cost Percent</label>
          <Input
            id="indirectCostPercent"
            v-model="form.indirectCostPercent"
            type="number"
            step="1"
            class="col-span-3"
            :class="{ 'border-red-500': errors.indirectCostPercent }"
          />
          <div
            v-if="errors.indirectCostPercent"
            class="col-span-3 col-start-2 text-red-500 text-sm"
          >
            {{ errors.indirectCostPercent }}
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit">Create</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
