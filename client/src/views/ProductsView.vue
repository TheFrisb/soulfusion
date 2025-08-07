<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import AddProductModal from '../components/modals/AddProductModal.vue'
import EditProductModal from '../components/modals/EditProductModal.vue'
import { useProductStore } from '@/stores/useProductsStore.ts'
import { useAuthStore } from '@/stores/authStore'
import type { Product } from '@/types/product.ts'
import { useToast } from 'vue-toastification'

const searchQuery = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedProduct = ref<Product | null>(null)

const productStore = useProductStore()
const authStore = useAuthStore()
const toast = useToast()

onMounted(() => {
  productStore.loadProducts()
})

const filteredProducts = computed<Product[]>(() => {
  return (productStore.products as Product[]).filter((product) => {
    if (!searchQuery.value) return true
    return product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

function openAddModal() {
  showAddModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
}

function handleProductCreated(product: Product) {
  toast.success('Product created successfully!')
  closeAddModal()
}

function handleProductCreationFailed(error: unknown) {
  toast.error('Failed to create product. Please try again.')
  console.error('Product creation failed:', error)
}

function openEditModal(product: Product) {
  selectedProduct.value = product
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  selectedProduct.value = null
}

function handleProductUpdated(product: Product) {
  toast.success('Product updated successfully!')
  closeEditModal()
}

function handleProductUpdateFailed(error: unknown) {
  toast.error('Failed to update product. Please try again.')
  console.error('Product update failed:', error)
}
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

            <div class="flex items-center gap-4">

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

              <button
                v-if="authStore.can('create-product')"
                @click="openAddModal"
                class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-soul to-brand-fusion hover:from-brand-fusion hover:to-brand-soul rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Product
              </button>
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
                <th
                  class="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
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
                <td class="px-6 py-4">
                  <button
                    v-if="authStore.can('edit-product')"
                    @click="openEditModal(product)"
                    class="text-gray-400 hover:text-primary-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                    title="Edit Product"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Product Modal -->
      <AddProductModal
        :is-open="showAddModal"
        @close="closeAddModal"
        @success="handleProductCreated"
        @failure="handleProductCreationFailed"
      />

      <!-- Edit Product Modal -->
      <EditProductModal
        :is-open="showEditModal"
        :product="selectedProduct"
        @close="closeEditModal"
        @success="handleProductUpdated"
        @failure="handleProductUpdateFailed"
      />
    </main>
  </div>
</template>
