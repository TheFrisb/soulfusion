<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authenticate } from '@/http/auth.js'
import { useToast } from 'vue-toastification'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const toast = useToast()

const handleLogin = async () => {
  try {
    const data = {
      username: username.value,
      password: password.value,
    }
    const response = await authenticate(data)
    if (response.status === 200) {
      await router.push({ name: 'orders' })
    }
  } catch (err) {
    console.error(err)
    error.value = 'Invalid username or password'
    toast.error('Invalid username or password')
  }
}
</script>

<template>
  <div class="min-h-screen bg-background-secondary flex items-center justify-center">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-black tracking-tight bg-gradient-to-r from-brand-soul via-brand-fusion to-brand-soul bg-clip-text text-transparent bg-[length:200%] animate-[gradient_4s_ease-in-out_infinite]"
        >
          SoulFusion
        </h1>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Welcome Back</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Username </label>
            <input
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-soul focus:border-brand-soul"
              placeholder="Enter your username"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Password </label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-soul focus:border-brand-soul"
              placeholder="Enter your password"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-sm text-red-600 text-center">
            {{ error }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full py-2 px-4 bg-gradient-to-r from-brand-soul to-brand-fusion text-white font-medium rounded-lg hover:from-brand-soul/90 hover:to-brand-fusion/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-soul"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
