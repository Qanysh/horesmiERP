<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import authService from '@/services/authService'
import AppHeader from '@/components/layout/AppHeader.vue'

const router = useRouter()
const form = ref({
  username: '',
  email: '',
  company: '',
  password: '',
  re_password: '',
})
const qrCodeUrl = ref(null)
const error = ref(null)

const handleSignup = async () => {
  try {
    error.value = null
    if (form.value.password !== form.value.re_password) {
      error.value = 'Passwords do not match'
      return
    }
    const response = await authService.signup(form.value)
    if (response.success) {
      const qrCodeData = response.url
      qrCodeUrl.value = await QRCode.toDataURL(qrCodeData)
    } else {
      error.value = response.message || 'Signup failed'
    }
  } catch (err) {
    error.value = err.message
    console.error('Signup error:', err)
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="w-full h-screen flex items-center justify-center">
      <Card class="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle class="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input v-model="form.username" id="username" placeholder="Username" required />
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label for="company">Company</Label>
              <Input v-model="form.company" id="company" placeholder="Your company" required />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input v-model="form.password" id="password" type="password" required />
            </div>
            <div class="grid gap-2">
              <Label for="re_password">Confirm Password</Label>
              <Input v-model="form.re_password" id="re_password" type="password" required />
            </div>
            <Button @click="handleSignup" type="submit" class="w-full">Create an account</Button>
          </div>
          <div v-if="qrCodeUrl" class="mt-4 text-center">
            <p>Scan this QR code with Google Authenticator:</p>
            <img :src="qrCodeUrl" alt="QR Code for Google Authenticator" class="mx-auto" />
          </div>
          <div v-if="error" class="mt-2 text-center text-sm text-red-500">{{ error }}</div>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <a href="#" class="underline" @click.prevent="goToLogin">Sign in</a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
