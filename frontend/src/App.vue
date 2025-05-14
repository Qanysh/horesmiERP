<script setup>
import Navbar from '@/components/widgets/header/Navbar.vue'
import Footer from '@/components/widgets/footer/Footer.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar v-if="!route.meta.hideLayout" />
    
    <main class="flex-1">
      <RouterView />
    </main>
    
    <Footer v-if="!route.meta.hideLayout" />
  </div>
</template>