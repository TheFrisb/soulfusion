import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchProducts, createProduct as createProductHttp, updateProduct as updateProductHttp } from '@/http/products'
import { useToast } from 'vue-toastification'
import { CreateUpdateProductRequest } from '@/types/requests/create-update-product-request'
import type { Product } from '@/types/product'

export const useProductStore = defineStore('productStore', () => {
  const toast = useToast()

  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  // ACTIONS
  async function loadProducts() {
    loading.value = true
    error.value = null
    try {
      products.value = await fetchProducts()
    } catch (err) {
      error.value = err
      toast.error('Failed to fetch products')
    } finally {
      loading.value = false
    }
  }

  async function createProduct(product: CreateUpdateProductRequest) {
    loading.value = true
    error.value = null
    try {
      const response = await createProductHttp(product)
      products.value.push(response)
      return response
    } catch (err) {
      error.value = err
      toast.error('Failed to create product')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProduct(id: string, product: CreateUpdateProductRequest) {
    loading.value = true
    error.value = null
    try {
      const response = await updateProductHttp(id, product)
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response
      }
      return response
    } catch (err) {
      error.value = err
      toast.error('Failed to update product')
      throw err
    } finally {
      loading.value = false
    }
  }

  const totalProducts = computed(() => products.value.length)

  return {
    // state
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    totalProducts,
  }
})
