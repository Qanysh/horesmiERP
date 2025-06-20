<script setup>
import { ref, watch, onMounted } from 'vue'
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

const productsStore = useProductsStore()
const vendorsStore = useVendorsStore()
const props = defineProps({
  open: Boolean,
  product: Object,
})

const emit = defineEmits(['update:open', 'saved'])

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

watch(
  () => props.product,
  (val) => {
    if (val) {
      form.value = {
        product_no: val.product_no || '',
        description: val.description || '',
        description2: val.description2 || '',
        type: val.type || '',
        inventory: val.inventory || '',
        createdFromNonstockProduct: val.createdFromNonstockProduct ? 1 : 0,
        substitutesExist: val.substitutesExist ? 1 : 0,
        stockkeepingUnitExists: val.stockkeepingUnitExists ? 1 : 0,
        assemblyBOM: val.assemblyBOM || '',
        productionBOMNo: val.productionBOMNo || '',
        routingNo: val.routingNo || '',
        baseUnitOfMeasure: val.baseUnitOfMeasure || '',
        shelfNo: val.shelfNo || '',
        costingMethod: val.costingMethod || '',
        costIsAdjusted: val.costIsAdjusted ? 1 : 0,
        standardCost: val.standardCost || '',
        unitCost: val.unitCost || '',
        lastDirectCost: val.lastDirectCost || '',
        priceProfitCalculation: val.priceProfitCalculation || '',
        profitPercent: val.profitPercent || '',
        unitPrice: val.unitPrice || '',
        inventoryPostingGroup: val.inventoryPostingGroup || '',
        genProdPostingGroup: val.genProdPostingGroup || '',
        vatProdPostingGroup: val.vatProdPostingGroup || '',
        productDiscGroup: val.productDiscGroup || '',
        vendorNo: val.vendorNo || '',
        vendorProductNo: val.vendorProductNo || '',
        tariffNo: val.tariffNo || '',
        searchDescription: val.searchDescription || '',
        overheadRate: val.overheadRate || '',
        indirectCostPercent: val.indirectCostPercent || '',
        productCategoryCode: val.productCategoryCode || '',
        blocked: val.blocked ? 1 : 0,
        salesUnitOfMeasure: val.salesUnitOfMeasure || '',
        replenishmentSystem: val.replenishmentSystem || '',
        purchUnitOfMeasure: val.purchUnitOfMeasure || '',
        leadTimeCalculation: val.leadTimeCalculation || '',
        manufacturingPolicy: val.manufacturingPolicy || '',
        flushingMethod: val.flushingMethod || '',
        assemblyPolicy: val.assemblyPolicy || '',
        productTrackingCode: val.productTrackingCode || '',
        defaultDeferralTemplateCode: val.defaultDeferralTemplateCode || '',
        isArchived: val.isArchived ? 1 : 0,
      }
    }
  },
  { immediate: true },
)

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

  delete data.lastDateModified

  return data
}

const handleSubmit = async () => {
  if (!validateForm()) {
    alert('Please fix the form errors before submitting')
    return
  }

  try {
    const transformedData = transformFormData()
    if (form.value.product_no) {
      await productsStore.updateProduct(form.value.product_no, transformedData)
    } else {
      await productsStore.createProduct(transformedData)
    }
    emit('saved')
    emit('update:open', false)
  } catch (error) {
    console.error('Error saving product:', error)
    alert(`Failed to save product: ${error.response?.data?.message || error.message}`)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription>Update product details below</DialogDescription>
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
        
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('update:open', false)">Cancel</Button>
        <Button @click="handleSubmit">Save</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
