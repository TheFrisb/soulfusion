import { jsonHttp } from '@/http/http.js'

export const fetchOrders = async (pageSize, page) => {
  return await jsonHttp
    .get('/api/orders/', { params: { page_size: pageSize, page: page } })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}

export const getOrder = async (id) => {
  return await jsonHttp
    .get(`/api/orders/${id}/`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}

export const updateOrderStatus = async (orderId, status) => {
  return await jsonHttp
    .patch(`/api/orders/${orderId}/status/`, { status: status })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}

export const updateOrderAgent = async (orderId, agentId) => {
  return await jsonHttp
    .patch(`/api/orders/${orderId}/agent/`, { agent_id: agentId })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}

export const clearOrderAgent = async (orderId) => {
  return await jsonHttp
    .delete(`/api/orders/${orderId}/agent/`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}

export const fetchPendingOrdersForAuthenticatedUser = async () => {
  return await jsonHttp
    .get('/api/accounts/me/orders/')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}
