<script setup>
import { RouterLink } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, ShoppingCart, Users, Package, UserCheck } from 'lucide-vue-next'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 rounded-lg">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Streamline Your Inventory Management</h1>
        <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Effortlessly manage purchase orders, vendors, inventory, and customers with our
          comprehensive solution.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/dashboard">
            <Button size="lg" class="bg-white text-blue-600 hover:bg-gray-50"> Get Started </Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 dark:bg-gray-900 rounded-lg mt-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card class="hover:shadow-lg transition-shadow">
            <CardHeader class="flex flex-row items-start space-y-0 space-x-4">
              <div class="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <ShoppingCart class="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription class="mt-1">
                  Create, track, and manage purchase orders with ease.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <RouterLink to="/purchase-orders">
                <Button variant="link" class="pl-0 text-blue-600 dark:text-blue-400">
                  View Orders
                </Button>
              </RouterLink>
            </CardContent>
          </Card>

          <Card class="hover:shadow-lg transition-shadow">
            <CardHeader class="flex flex-row items-start space-y-0 space-x-4">
              <div class="p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                <Users class="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>Vendor Management</CardTitle>
                <CardDescription class="mt-1">
                  Organize and maintain your supplier relationships.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <RouterLink to="/vendors">
                <Button variant="link" class="pl-0 text-green-600 dark:text-green-400">
                  Manage Vendors
                </Button>
              </RouterLink>
            </CardContent>
          </Card>

          <Card class="hover:shadow-lg transition-shadow">
            <CardHeader class="flex flex-row items-start space-y-0 space-x-4">
              <div class="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <Package class="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>Inventory Control</CardTitle>
                <CardDescription class="mt-1">
                  Monitor stock levels and manage inventory efficiently.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <RouterLink to="/items">
                <Button variant="link" class="pl-0 text-purple-600 dark:text-purple-400">
                  View Inventory
                </Button>
              </RouterLink>
            </CardContent>
          </Card>

          <Card class="hover:shadow-lg transition-shadow">
            <CardHeader class="flex flex-row items-start space-y-0 space-x-4">
              <div class="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/30">
                <UserCheck class="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle>Customer Relations</CardTitle>
                <CardDescription class="mt-1">
                  Keep track of client details and interactions.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <RouterLink to="/customers">
                <Button variant="link" class="pl-0 text-orange-600 dark:text-orange-400">
                  Manage Customers
                </Button>
              </RouterLink>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white dark:bg-gray-950 border-t">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses managing their inventory with our solution.
        </p>
        <RouterLink to="/dashboard">
          <Button size="lg" class="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus class="mr-2 h-4 w-4" />
            Create Your First Order
          </Button>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
