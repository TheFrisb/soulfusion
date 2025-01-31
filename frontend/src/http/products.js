import { jsonHttp } from '@/http/http.js'

export const fetchProducts = async () => {
  return await jsonHttp
    .get('/api/products/')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}
