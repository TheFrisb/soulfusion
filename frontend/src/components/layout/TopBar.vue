<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const userFullName = 'John Doe'

function handleLogout() {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>

<template>
  <header class="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-10 shadow-md">
    <div class="flex justify-between items-center h-full px-6">
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-full bg-gradient-to-r from-brand-soul to-brand-fusion flex items-center justify-center text-white font-medium"
        >
          {{
            userFullName
              .split(' ')
              .map((n) => n[0])
              .join('')
          }}
        </div>
        <span class="text-lg font-semibold text-gray-900">{{ userFullName }}</span>
      </div>
      <button
        @click="handleLogout"
        class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  </header>
</template>
