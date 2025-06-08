<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePurchaseOrdersStore } from '@/stores/purchaseOrders'
import { useSalesOrdersStore } from '@/stores/salesOrders'
import { useVendorsStore } from '@/stores/vendors'
import { useItemsStore } from '@/stores/items'
import { useCustomersStore } from '@/stores/customers'
import VueApexCharts from 'vue3-apexcharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowUpRight, Plus } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const purchaseOrdersStore = usePurchaseOrdersStore()
const salesOrdersStore = useSalesOrdersStore()
const vendorsStore = useVendorsStore()
const itemsStore = useItemsStore()
const customersStore = useCustomersStore()
const router = useRouter()

const loading = ref(true)

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      salesOrdersStore.fetchSalesOrders(),
      vendorsStore.fetchVendors(),
      itemsStore.fetchItems(),
      customersStore.fetchCustomers(),
      purchaseOrdersStore.fetchPurchaseOrders(),
    ])
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
})

const summaryData = computed(() => ({
  totalOrders: salesOrdersStore.salesOrders.length,
  totalVendors: vendorsStore.vendors.length,
  totalItems: itemsStore.items.length,
  totalCustomers: customersStore.customers.length,
  openOrders: salesOrdersStore.salesOrders.filter((o) => o.status === 'Open').length,
  recentOrders: salesOrdersStore.salesOrders.slice(0, 5),
}))

const ordersByStatusOptions = computed(() => {
  const statusCounts = salesOrdersStore.salesOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {})

  return {
    chart: { type: 'donut' },
    labels: Object.keys(statusCounts),
    series: Object.values(statusCounts),
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    legend: { position: 'bottom' },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' },
        },
      },
    ],
  }
})

const monthlyOrderTrendsOptions = computed(() => {
  const monthlyData = salesOrdersStore.salesOrders.reduce((acc, order) => {
    const date = new Date(order.orderDate)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    acc[monthYear] = (acc[monthYear] || 0) + 1
    return acc
  }, {})

  const sortedMonths = Object.keys(monthlyData).sort()

  return {
    chart: {
      type: 'line',
      height: 350,
      zoom: { enabled: false },
    },
    stroke: { curve: 'smooth', width: 3 },
    markers: { size: 5 },
    series: [{ name: 'Orders', data: sortedMonths.map((month) => monthlyData[month]) }],
    xaxis: {
      categories: sortedMonths,
      labels: {
        formatter: function (value) {
          return typeof value === 'string' && value.includes('-')
            ? value.split('-')[1]
            : value || ''
        },
      },
    },
    yaxis: { title: { text: 'Number of Orders' } },
    colors: ['#008FFB'],
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <RouterLink to="/purchase-orders">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">Total Orders</CardTitle>
            <Badge variant="outline">
              <ArrowUpRight class="h-4 w-4" />
            </Badge>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ summaryData.totalOrders }}</div>
            <p class="text-xs text-muted-foreground">{{ summaryData.openOrders }} open orders</p>
          </CardContent>
        </Card>
      </RouterLink>

      <RouterLink to="/vendors">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">Vendors</CardTitle>
            <Badge variant="outline">
              <ArrowUpRight class="h-4 w-4" />
            </Badge>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ summaryData.totalVendors }}</div>
            <p class="text-xs text-muted-foreground">Active suppliers</p>
          </CardContent>
        </Card>
      </RouterLink>

      <RouterLink to="/items">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">Inventory Items</CardTitle>
            <Badge variant="outline">
              <ArrowUpRight class="h-4 w-4" />
            </Badge>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ summaryData.totalItems }}</div>
            <p class="text-xs text-muted-foreground">In stock</p>
          </CardContent>
        </Card>
      </RouterLink>

      <RouterLink to="/customers">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">Customers</CardTitle>
            <Badge variant="outline">
              <ArrowUpRight class="h-4 w-4" />
            </Badge>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ summaryData.totalCustomers }}</div>
            <p class="text-xs text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>
      </RouterLink>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card class="col-span-1">
        <CardHeader>
          <CardTitle>Sales Orders by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <VueApexCharts
            type="donut"
            :options="ordersByStatusOptions"
            :series="ordersByStatusOptions.series"
            height="300"
          />
        </CardContent>
      </Card>

      <Card class="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Sales Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <VueApexCharts
            type="line"
            :options="monthlyOrderTrendsOptions"
            :series="monthlyOrderTrendsOptions.series"
            height="300"
          />
        </CardContent>
      </Card>
    </div>
    <Card class="col-span-2" v-if="!loading.value">
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Recent Sales Orders</CardTitle>
          <RouterLink to="/sales-orders">
            <Button variant="outline" size="sm" class="ml-auto gap-1">
              View All
              <ArrowUpRight class="h-3.5 w-3.5" />
            </Button>
          </RouterLink>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Customer Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="order in salesOrdersStore.salesOrders.slice(0, 5)" :key="order.no">
              <TableCell class="font-medium">{{ order.no }}</TableCell>
              <TableCell>{{
                order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'
              }}</TableCell>
              <TableCell>
                <Badge
                  :class="{
                    'bg-green-500 text-white': order.status === 'Open',
                    'bg-blue-500 text-white': order.status === 'Released',
                    'bg-yellow-500 text-white': order.status === 'Pending Approval',
                    'bg-red-500 text-white': order.status === 'Canceled',
                  }"
                >
                  {{ order.status }}
                </Badge>
              </TableCell>
              <TableCell>{{ order.sellToEmail || 'N/A' }}</TableCell>
              <TableCell>{{ order.sellToCustomerName || 'N/A' }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card class="col-span-2" v-if="!loading.value">
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Recent Purchase Orders</CardTitle>
          <RouterLink to="/purchase-orders">
            <Button variant="outline" size="sm" class="ml-auto gap-1">
              View All
              <ArrowUpRight class="h-3.5 w-3.5" />
            </Button>
          </RouterLink>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vendor Email</TableHead>
              <TableHead>Vendor Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="order in purchaseOrdersStore.purchaseOrders.slice(0, 5)"
              :key="order.no"
            >
              <TableCell class="font-medium">{{ order.no }}</TableCell>
              <TableCell>{{
                order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'
              }}</TableCell>
              <TableCell>
                <Badge
                  :class="{
                    'bg-green-500 text-white': order.status === 'Open',
                    'bg-blue-500 text-white': order.status === 'Released',
                    'bg-yellow-500 text-white': order.status === 'Pending Approval',
                    'bg-red-500 text-white': order.status === 'Canceled',
                  }"
                >
                  {{ order.status }}
                </Badge>
              </TableCell>
              <TableCell>{{ order.buyFromContactEmail || 'N/A' }}</TableCell>
              <TableCell>{{ order.buyFromVendorName || 'N/A' }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4">
        <RouterLink to="/purchase-orders/">
          <Button variant="outline" class="w-full justify-start">
            <Plus class="mr-2 h-4 w-4" />
            Create Purchase Order
          </Button>
        </RouterLink>
        <RouterLink to="/vendors/">
          <Button variant="outline" class="w-full justify-start">
            <Plus class="mr-2 h-4 w-4" />
            Add New Vendor
          </Button>
        </RouterLink>
        <RouterLink to="/items/">
          <Button variant="outline" class="w-full justify-start">
            <Plus class="mr-2 h-4 w-4" />
            Add Inventory Item
          </Button>
        </RouterLink>
      </CardContent>
    </Card>
  </div>
</template>
