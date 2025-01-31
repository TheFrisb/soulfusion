import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchProducts } from '@/http/products.js'
import { useToast } from 'vue-toastification'

export const useProductStore = defineStore('productStore', () => {
  const toast = useToast()

  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

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

  const totalProducts = computed(() => products.value.length)

  return {
    // state
    products,
    loading,
    error,
    loadProducts,
    totalProducts,
  }
})
