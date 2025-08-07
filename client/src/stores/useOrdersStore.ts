import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import {
  addCommentToOrder,
  clearOrderAgent,
  fetchOrders,
  markOrderConfirmed,
  updateOrderAgent,
  updateOrderStatus,
} from '@/http/orders.js'
import type { Order } from '@/types/order'

export const useOrdersStore = defineStore('ordersStore', () => {
  const toast = useToast()

  const orders = ref<Order[]>([])
  const totalOrders = ref(0)
  const page = ref(1)
  const pageSize = ref(100)

  const hasPrevious = ref(false)
  const hasNext = ref(true)
  const loading = ref(false)

  async function loadOrders() {
    loading.value = true
    try {
      const response = await fetchOrders(pageSize.value, page.value)
      orders.value = sortOrdersByPendingFirst(response.results)

      hasNext.value = response.next !== null
      hasPrevious.value = response.previous !== null
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch orders')
    } finally {
      loading.value = false
    }
  }

  function sortOrdersByPendingFirst(orders) {
    return orders.sort((a, b) => {
      if (a.status === 'PENDING' && b.status !== 'PENDING') {
        return -1
      }
      if (a.status !== 'PENDING' && b.status === 'PENDING') {
        return 1
      }
      return 0
    })
  }

  async function assignOrderToAgent(orderId, agentId) {
    try {
      const updatedOrder = await updateOrderAgent(orderId, agentId)
      const orderIndex = orders.value.findIndex((order) => order.id === orderId)
      if (orderIndex !== -1) {
        orders.value[orderIndex] = updatedOrder
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to assign order to agent')
    }
  }

  async function removeAgentFromOrder(orderId) {
    try {
      await clearOrderAgent(orderId)
      const orderIndex = orders.value.findIndex((order) => order.id === orderId)

      if (orderIndex !== -1) {
        orders.value[orderIndex].agent = null
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to clear order agent')
    }
  }

  async function changeOrderStatus(orderId, status) {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status)
      const orderIndex = orders.value.findIndex((order) => order.id === orderId)
      if (orderIndex !== -1) {
        orders.value[orderIndex] = updatedOrder
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to update order status')
    }
  }

  async function addOrderComment(orderId, comment) {
    try {
      await addCommentToOrder(orderId, comment)
    } catch (err) {
      console.error(err)
      toast.error('Failed to add comment to order')
    }
  }

  async function confirmOrder(orderId, quantity, address) {
    try {
      const response = await markOrderConfirmed(orderId, quantity, address)
      const orderIndex = orders.value.findIndex((order) => order.id === orderId)

      if (orderIndex !== -1) {
        orders.value[orderIndex] = response
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to confirm order')
    }
  }

  function updatePageSize(newPageSize) {
    pageSize.value = newPageSize
    loadOrders()
  }

  function goToPage(newPage) {
    page.value = newPage
    loadOrders()
  }

  return {
    orders,
    totalOrders,
    page,
    pageSize,
    hasPrevious,
    hasNext,
    loading,
    loadOrders,
    updatePageSize,
    goToPage,
    changeOrderStatus,
    assignOrderToAgent,
    removeAgentFromOrder,
    addOrderComment,
    confirmOrder,
  }
})
