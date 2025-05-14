<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authApi'
import AuthLayout from '../components/AuthLayout.vue'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({
  email: '',
  password: '',
  token: ''
})
const error = ref('')

const handleLogin = async () => {
  try {
    const data = await login(form.value)
    
    if (data.validated) {
      authStore.login({
        email: form.value.email,
        ...(data.user || {})
      })
      router.push('/')
    } else {
      error.value = 'Login failed. Check your credentials and 2FA code.'
    }
  } catch (err) {
    error.value = 'Network error. Please try again.'
    console.error('Login error:', err)
  }
}
</script>

<template>
  <AuthLayout title="Login">
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="form.email" type="email" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="form.password" type="password" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">2FA Code</label>
        <input v-model="form.token" type="text" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
               placeholder="6-digit code from authenticator">
      </div>

      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Login
      </button>
    </form>

    <template #footer>
      Don't have an account? 
      <router-link to="/signup" class="text-blue-600 hover:text-blue-800">
        Register
      </router-link>
    </template>
  </AuthLayout>
</template>