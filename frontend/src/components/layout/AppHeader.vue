<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, LogOutIcon, MenuIcon, XIcon, UserIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const auth = useAuthStore()
const isAuthenticated = computed(() => auth.isAuth)
const isAdmin = computed(() => auth.userRole === 'admin')

onMounted(async () => {
  await auth.checkAuth()
})

const handleLogout = async () => {
  await auth.logout()
  isMobileMenuOpen.value = false
}

const goToSignup = () => {
  router.push('/signup')
}

const goToLogin = () => {
  router.push('/login')
}

const goToAdmin = () => {
  router.push('/admin/users')
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between px-4 mx-auto">
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

      <nav class="flex items-center gap-6 mx-6">
        <div v-if="isAuthenticated" class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in [
              { to: '/dashboard', text: 'Dashboard' },
              { to: '/customers', text: 'Customers' },
              { to: '/vendors', text: 'Vendors' },
              { to: '/items', text: 'Items' },
              { to: '/products', text: 'Products' },
              { to: '/production-tools', text: 'Production Tools' },
              { to: '/purchase-orders', text: 'Purchase Orders' },
              { to: '/sales-orders', text: 'Sales Orders' },
              { to: '/general-ledger-entries', text: 'General Ledger Entries' },
            ]"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
            active-class="text-foreground"
          >
            {{ link.text }}
          </RouterLink>
        </div>
        <div v-else class="hidden md:flex items-center gap-4">
          <Button variant="outline" @click="goToLogin" class="text-sm">Login</Button>
          <Button @click="goToSignup" class="text-sm">Signup</Button>
        </div>
      </nav>

      <div class="flex items-center gap-4">
        <div v-if="isAuthenticated" class="hidden md:flex items-center gap-4">
          <Button v-if="isAdmin" variant="ghost" size="icon" title="Admin Panel" @click="goToAdmin">
            <UserIcon class="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Logout" @click="handleLogout">
            <LogOutIcon class="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Button
        v-if="!isAuthenticated"
        variant="ghost"
        size="icon"
        class="md:hidden"
        @click="goToLogin"
      >
        <SearchIcon class="h-5 w-5" />
      </Button>
      <Button
        v-if="!isAuthenticated"
        variant="ghost"
        size="icon"
        class="md:hidden"
        @click="goToSignup"
      >
        <SearchIcon class="h-5 w-5" />
      </Button>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden bg-background border-t">
      <div class="container px-4 py-3 space-y-3">
        <div v-if="isAuthenticated">
          <RouterLink
            v-for="link in [
              { to: '/dashboard', text: 'Dashboard' },
              { to: '/customers', text: 'Customers' },
              { to: '/vendors', text: 'Vendors' },
              { to: '/items', text: 'Items' },
              { to: '/products', text: 'Products' },
              { to: '/production-tools', text: 'Production Tools' },
              { to: '/purchase-orders', text: 'Purchase Orders' },
              { to: '/sales-orders', text: 'Sales Orders' },
              { to: '/general-ledger-entries', text: 'General Ledger Entries' },
            ]"
            :key="link.to"
            :to="link.to"
            class="block py-2 text-sm font-medium"
            active-class="text-primary"
            @click="isMobileMenuOpen = false"
          >
            {{ link.text }}
          </RouterLink>
          <Button v-if="isAdmin" variant="outline" class="w-full mt-2 gap-2" @click="goToAdmin">
            <UserIcon class="h-4 w-4" />
            <span>Admin Panel</span>
          </Button>
          <Button variant="outline" class="w-full mt-2 gap-2" @click="handleLogout">
            <LogOutIcon class="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
        <div v-else>
          <Button variant="outline" class="w-full mt-2" @click="goToLogin">Login</Button>
          <Button class="w-full mt-2" @click="goToSignup">Signup</Button>
        </div>
      </div>
    </div>
  </header>
</template>
