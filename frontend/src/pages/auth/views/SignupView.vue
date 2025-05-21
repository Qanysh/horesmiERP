<script setup>
import { ref, nextTick } from 'vue'
import QRCode from 'qrcode'
import { useRouter } from 'vue-router'
import { register } from '../services/authApi'
import AuthLayout from '../components/AuthLayout.vue'

const router = useRouter()
const form = ref({
  username: '',
  email: '',
  company: '',
  password: '',
  confirmPassword: ''
})
const showQR = ref(false)
const qrCanvas = ref(null)
const error = ref('')

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    error.value = "Passwords don't match!"
    return
  }

  try {
    const response = await register(form.value)
    
    if (response.url) {
      showQR.value = true
      nextTick(() => {
        QRCode.toCanvas(qrCanvas.value, response.url, { width: 200 })
      })
    } else {
      error.value = response.error || 'Registration failed'
    }
  } catch (err) {
    error.value = 'Network error. Please try again.'
    console.error('Registration error:', err)
  }
}
</script>

<template>
  <AuthLayout :title="showQR ? 'Set Up 2FA' : 'Register'">
    <template v-if="!showQR">
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="form.username" type="text" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Company</label>
          <input v-model="form.company" type="text" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" required minlength="8"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Register
        </button>

        <!-- Added "Go to Login" link -->
        <div class="text-center text-sm mt-4">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:text-blue-800 ml-1">
            Login here
          </router-link>
        </div>
      </form>
    </template>

    <template v-else>
      <div class="text-center">
        <canvas ref="qrCanvas" class="mx-auto border border-gray-200 p-1 mb-4"></canvas>
        <p class="text-sm text-gray-600 mb-2">Scan with Google Authenticator</p>
        <p class="text-sm text-gray-500 mb-4">You'll need this to log in</p>
        <router-link to="/login" class="text-blue-600 hover:text-blue-800 text-sm">
          Go to Login
        </router-link>
      </div>
    </template>
  </AuthLayout>
</template>