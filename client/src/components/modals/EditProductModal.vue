<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { CreateUpdateProductRequest } from '@/types/requests/create-update-product-request'
import { useProductStore } from '@/stores/useProductsStore'
import { Product } from '@/types/product.ts'

const props = defineProps<{
  isOpen: boolean
  product: Product | null
}>()

const emit = defineEmits<{
  close: []
  success: [product: Product]
  failure: [error: unknown]
}>()

const productStore = useProductStore()

const form = reactive<CreateUpdateProductRequest>({
  name: '',
  sale_price: 0,
  stock_price: 0,
  stock: 0,
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

// Watch for product changes and populate form
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    form.name = newProduct.name
    form.sale_price = newProduct.sale_price
    form.stock_price = newProduct.stock_price
    form.stock = newProduct.stock
  }
}, { immediate: true })

function validateForm(): boolean {
  errors.name = ''
  errors.sale_price = ''
  errors.stock_price = ''
  errors.stock = ''

  let isValid = true

  if (!form.name.trim()) {
    errors.name = 'Product name is required'
    isValid = false
  }

  if (form.sale_price <= 0) {
    errors.sale_price = 'Sale price must be greater than 0'
    isValid = false
  }

  if (form.stock_price <= 0) {
    errors.stock_price = 'Stock price must be greater than 0'
    isValid = false
  }

  if (form.stock < 0) {
    errors.stock = 'Stock cannot be negative'
    isValid = false
  }

  return isValid
}

async function handleSubmit() {
  if (!validateForm() || !props.product) {
    return
  }

  isSubmitting.value = true

  try {
    const updatedProduct = await productStore.updateProduct(props.product.id, form)
    emit('success', updatedProduct)
    closeModal()
  } catch (error) {
    emit('failure', error)
  } finally {
    isSubmitting.value = false
  }
}

function closeModal() {
  // Reset form
  form.name = ''
  form.sale_price = 0
  form.stock_price = 0
  form.stock = 0

  // Clear errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Edit Product</h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-500 transition-colors"
          :disabled="isSubmitting"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Product Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            :class="{ 'border-red-500': errors.name }"
            :disabled="isSubmitting"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>

        <!-- Sale Price -->
        <div>
          <label for="sale_price" class="block text-sm font-medium text-gray-700 mb-1">
            Sale Price (MKD) *
          </label>
          <input
            id="sale_price"
            v-model.number="form.sale_price"
            type="number"
            step="0.01"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            :class="{ 'border-red-500': errors.sale_price }"
            :disabled="isSubmitting"
          />
          <p v-if="errors.sale_price" class="mt-1 text-sm text-red-600">{{ errors.sale_price }}</p>
        </div>

        <!-- Stock Price -->
        <div>
          <label for="stock_price" class="block text-sm font-medium text-gray-700 mb-1">
            Stock Price (MKD) *
          </label>
          <input
            id="stock_price"
            v-model.number="form.stock_price"
            type="number"
            step="0.01"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            :class="{ 'border-red-500': errors.stock_price }"
            :disabled="isSubmitting"
          />
          <p v-if="errors.stock_price" class="mt-1 text-sm text-red-600">{{ errors.stock_price }}</p>
        </div>

        <!-- Stock -->
        <div>
          <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity *
          </label>
          <input
            id="stock"
            v-model.number="form.stock"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            :class="{ 'border-red-500': errors.stock }"
            :disabled="isSubmitting"
          />
          <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-soul to-brand-fusion hover:from-brand-fusion hover:to-brand-soul rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
            <span v-else>Update Product</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
