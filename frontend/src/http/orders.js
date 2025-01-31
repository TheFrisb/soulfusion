import { jsonHttp } from '@/http/http.js'

export const fetchOrders = async () => {
  return await jsonHttp
    .get('/api/orders/')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}
