<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import { useProductStore } from '@/stores/useProductsStore.ts'
import type { Product } from '@/types/product.ts'

const searchQuery = ref('')

const productStore = useProductStore()

onMounted(() => {
  productStore.loadProducts()
})

const filteredProducts = computed<Product[]>(() => {
  return (productStore.products as Product[]).filter((product) => {
    if (!searchQuery.value) return true
    return product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})
</script>

<template>
  <div class="min-h-screen bg-background-secondary">
    <TopBar />
    <SideBar />

    <!-- Main Content -->
    <main class="ml-64 p-16 mt-16">
      <div class="mx-auto">
        <!-- Header -->
        <div class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-brand-soul to-brand-fusion bg-clip-text text-transparent"
            >
              Products
            </h1>

            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{{
                new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}</span>
            </div>
          </div>

          <!-- Search Field -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Product"
              class="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <svg
              class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Products Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-y border-gray-200">
                <th
                  class="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock Price
                </th>
                <th
                  class="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sale Price
                </th>
                <th
                  class="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="product in filteredProducts"
                :key="product.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
                    :class="
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    "
                  >
                    {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-900">{{ product.id }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-900">{{ product.name }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-900"
                    >{{ product.stock_price.toFixed(2) }} MKD</span
                  >
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-900"
                    >{{ product.sale_price.toFixed(2) }} MKD</span
                  >
                </td>
                <td class="px-6 py-4">
                  <span
                    class="text-sm font-medium"
                    :class="
                      product.stock === 0
                        ? 'text-red-600'
                        : product.stock < 100
                          ? 'text-amber-600'
                          : 'text-green-600'
                    "
                  >
                    {{ product.stock }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>
