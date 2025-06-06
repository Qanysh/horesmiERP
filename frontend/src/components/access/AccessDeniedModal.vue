<script setup>
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/useModalStore'

const router = useRouter()
const modal = useModalStore()

function goHome() {
  modal.closeAccessDenied()
  router.push('/')
}
</script>

<template>
  <div
    v-if="modal.showAccessDenied"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
      <h2 class="text-xl font-semibold text-red-600 mb-2">Access Denied</h2>
      <p class="text-gray-600 mb-4">Insufficient role. Contact admin for further information.</p>
      <div class="flex justify-center gap-4">
        <button
          @click="goHome"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  </div>
</template>
