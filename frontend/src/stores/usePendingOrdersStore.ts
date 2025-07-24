import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { fetchPendingOrdersForAuthenticatedUser } from '@/http/orders.js'

export const usePendingOrdersStore = defineStore('pendingOrdersStore', () => {
  const toast = useToast()

  const pendingOrders = ref([])
  const loading = ref(false)

  async function loadPendingOrders() {
    loading.value = true
    try {
      const response = await fetchPendingOrdersForAuthenticatedUser()
      pendingOrders.value = response
    } catch (error) {
      console.error(error)
      toast.error('Failed to load pending orders')
    } finally {
      loading.value = false
    }
  }

  return {
    pendingOrders,
    loading,
    loadPendingOrders,
  }
})
