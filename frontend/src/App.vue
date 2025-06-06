<script setup>
import { RouterView } from 'vue-router'
import AccessDeniedModal from './components/access/AccessDeniedModal.vue'
</script>

<template>
  <RouterView />
  <AccessDeniedModal />
</template>
