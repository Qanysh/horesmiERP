<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between px-4 mx-auto">
      <!-- Logo and mobile menu button -->
      <div class="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          class="md:hidden"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <MenuIcon v-if="!isMobileMenuOpen" class="h-5 w-5" />
          <XIcon v-else class="h-5 w-5" />
        </Button>

        <RouterLink to="/" class="flex items-center text-lg font-bold sm:text-xl">
          Horesmi
        </RouterLink>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-6 mx-6">
        <RouterLink
          v-for="link in [
            { to: '/dashboard', text: 'Dashboard' },
            { to: '/customers', text: 'Customers' },
            { to: '/vendors', text: 'Vendors' },
            { to: '/dashboard', text: 'Dashboard' },
            { to: '/customers', text: 'Customers' },
            { to: '/sales', text: 'Sales' },
          ]"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
          active-class="text-foreground"
        >
          {{ link.text }}
        </RouterLink>
      </nav>

      <!-- Search and Logout - Desktop -->
      <div class="hidden md:flex items-center gap-4">
        <div class="relative">
          <SearchIcon
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            placeholder="Search..."
            class="pl-9 w-[150px] lg:w-[200px]"
          />
        </div>
        <Button variant="ghost" size="icon" title="Logout">
          <LogOutIcon class="h-5 w-5" />
        </Button>
      </div>

      <!-- Mobile Search Button -->
      <Button variant="ghost" size="icon" class="md:hidden" title="Search">
        <SearchIcon class="h-5 w-5" />
      </Button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-background border-t">
      <div class="container px-4 py-3 space-y-3">
        <!-- Mobile Navigation -->
        <RouterLink
          v-for="link in [
            { to: '/dashboard', text: 'Dashboard' },
            { to: '/customers', text: 'Customers' },
            { to: '/sales', text: 'Sales' },
            { to: '/dashboard', text: 'Dashboard' },
            { to: '/customers', text: 'Customers' },
            { to: '/sales', text: 'Sales' },
          ]"
          :key="link.to"
          :to="link.to"
          class="block py-2 text-sm font-medium"
          active-class="text-primary"
          @click="isMobileMenuOpen = false"
        >
          {{ link.text }}
        </RouterLink>

        <!-- Mobile Search -->
        <div class="relative pt-2">
          <SearchIcon
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input v-model="searchQuery" placeholder="Search..." class="pl-9 w-full" />
        </div>

        <!-- Mobile Logout -->
        <Button variant="outline" class="w-full mt-2 gap-2">
          <LogOutIcon class="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  </header>
</template>
