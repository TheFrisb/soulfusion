<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import {
  BoxIcon,
  PhoneIcon,
  ShoppingCartIcon,
  StoreIcon,
  UserRoundCogIcon,
  FileIcon,
  ClipboardListIcon
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const isActive = computed(() => (path: string) => route.path === path)

const baseNavigation = [
  {
    name: 'Orders',
    icon: StoreIcon,
    path: null,
    children: [
      {
        name: 'All Orders',
        icon: ShoppingCartIcon,
        path: '/',
        show: () => authStore.can('view-all-orders')
      },
      {
        name: 'Assigned to me',
        icon: PhoneIcon,
        path: '/my-pendings',
        show: () => authStore.can('view-assigned-orders')
      }
    ]
  },
  {
    name: 'Products',
    icon: BoxIcon,
    path: '/products',
    show: () => authStore.can('manage-products')
  },
  {
    name: 'Users',
    icon: UserRoundCogIcon,
    path: '/users',
    show: () => authStore.can('manage-users')
  },
  {
    name: 'Prediction Lists',
    icon: ClipboardListIcon,
    path: '/prediction-lists',
    show: () => authStore.can('view-prediction-lists')
  }
]

const navigation = computed(() => {
  return baseNavigation
    .filter(item => {
      // For items with children, show if any child is visible
      if (item.children) {
        return item.children.some(child => child.show())
      }
      // For items without children, show if the item itself is visible
      return item.show ? item.show() : true
    })
    .map(item => ({
      ...item,
      children: item.children?.filter(child => child.show()).map(child => ({
        ...child,
        isActive: isActive.value(child.path)
      })),
      isActive: item.path ? isActive.value(item.path) : false
    }))
})

const openStates = ref<Record<string, boolean>>(
  baseNavigation
    .filter((item) => item.children)
    .reduce((acc: Record<string, boolean>, item) => {
      acc[item.name] = true // Open by default, matching original behavior
      return acc
    }, {} as Record<string, boolean>)
)

const toggleOpen = (name: string) => {
  openStates.value[name] = !openStates.value[name]
}
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
    <nav class="p-4 space-y-4">
      <template v-for="item in navigation" :key="item.name">
        <!-- Items with children (e.g., Orders) -->
        <div v-if="item.children" class="space-y-2">
          <button
            @click="toggleOpen(item.name)"
            class="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg"
          >
            <div class="flex items-center gap-3">
              <component :is="item.icon" class="w-5 h-5" />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </div>
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': openStates[item.name] }"
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
          <div v-show="openStates[item.name]" class="pl-4 space-y-1">
            <router-link
              v-for="child in item.children"
              :key="child.name"
              :to="child.path"
              class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              :class="
                child.isActive
                  ? 'bg-gradient-to-r from-brand-soul to-brand-fusion text-white shadow-lg shadow-brand-soul/20'
                  : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-brand-soul/20 hover:to-brand-fusion/20'
              "
            >
              <component :is="child.icon" class="w-4 h-4" />
              <span class="text-sm font-medium">{{ child.name }}</span>
            </router-link>
          </div>
        </div>
        <!-- Items without children (e.g., Products, Users) -->
        <router-link
          v-else
          :to="item.path"
          class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          :class="
            item.isActive
              ? 'bg-gradient-to-r from-brand-soul to-brand-fusion text-white shadow-lg shadow-brand-soul/20'
              : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-brand-soul/20 hover:to-brand-fusion/20'
          "
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="text-sm font-medium">{{ item.name }}</span>
        </router-link>
      </template>
    </nav>
  </aside>
</template>
