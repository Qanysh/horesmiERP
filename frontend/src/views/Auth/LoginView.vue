<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import authService from '@/services/authService'
import AppHeader from '@/components/layout/AppHeader.vue'

const router = useRouter()
const form = ref({
  email: '',
  password: '',
  token: '',
})
const error = ref(null)

const handleLogin = async () => {
  try {
    error.value = null
    await authService.login(form.value)
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}

const goToSignup = () => {
  router.push('/signup')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="w-full h-screen flex items-center justify-center">
      <Card class="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle class="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="Horesmi@example.com"
                required
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
              </div>
              <Input v-model="form.password" id="password" type="password" required />
            </div>
            <div class="grid gap-2">
              <Label for="token">Google Authenticator Token</Label>
              <Input v-model="form.token" id="token" type="text" required />
            </div>
            <Button @click="handleLogin" type="submit" class="w-full">Login</Button>
          </div>
          <div v-if="error" class="mt-2 text-center text-sm text-red-500">{{ error }}</div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="#" class="underline" @click.prevent="goToSignup">Sign up</a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
