<script setup>
import Navbar from '@/components/widgets/header/Navbar.vue'
import Footer from '@/components/widgets/footer/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-1">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>