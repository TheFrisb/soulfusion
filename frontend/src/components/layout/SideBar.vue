<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = computed(() => (path) => route.path === path)
const isOrdersOpen = ref(true)
</script>

<template>
  <aside class="fixed top-0 left-0 w-64 h-screen bg-background-sidebar border-r border-gray-800">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b border-gray-800">
      <h1
        class="text-3xl font-black tracking-tight bg-gradient-to-r from-brand-soul via-brand-fusion to-brand-soul bg-clip-text text-transparent bg-[length:200%] animate-[gradient_4s_ease-in-out_infinite]"
      >
        SoulFusion
      </h1>
    </div>

    <!-- Navigation -->
    <nav class="p-4">
      <!-- Orders Accordion -->
      <div class="space-y-2">
        <button
          @click="isOrdersOpen = !isOrdersOpen"
          class="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg"
        >
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span class="text-sm font-medium">Orders</span>
          </div>
          <svg
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': isOrdersOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div v-show="isOrdersOpen" class="pl-4 space-y-1">
          <router-link
            to="/"
            class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            :class="
              isActive('/')
                ? 'bg-gradient-to-r from-brand-soul to-brand-fusion text-white shadow-lg shadow-brand-soul/20'
                : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-brand-soul/20 hover:to-brand-fusion/20'
            "
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span class="text-sm font-medium">All Orders</span>
          </router-link>

          <router-link
            to="/my-pendings"
            class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            :class="
              isActive('/my-pendings')
                ? 'bg-gradient-to-r from-brand-soul to-brand-fusion text-white shadow-lg shadow-brand-soul/20'
                : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-brand-soul/20 hover:to-brand-fusion/20'
            "
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="text-sm font-medium">Assigned to me</span>
          </router-link>
        </div>
      </div>

      <!-- Products Link -->
      <router-link
        to="/products"
        class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors mt-2"
        :class="
          isActive('/products')
            ? 'bg-gradient-to-r from-brand-soul to-brand-fusion text-white shadow-lg shadow-brand-soul/20'
            : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-brand-soul/20 hover:to-brand-fusion/20'
        "
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <span class="text-sm font-medium">Products</span>
      </router-link>
    </nav>
  </aside>
</template>
