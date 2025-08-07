import { jsonHttp } from '@/http/http.js'
import { CreateUpdateProductRequest } from '@/types/requests/create-update-product-request'
import type { Product } from '@/types/product'

export const fetchProducts = async (): Promise<Product[]> => {
  return await jsonHttp
    .get('/api/products/')
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error.response.data
    })
}

export const createProduct = async (product: CreateUpdateProductRequest): Promise<Product> => {
  return await jsonHttp
    .post('/api/products/', product)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error.response.data
    })
}

export const updateProduct = async (id: string,product: CreateUpdateProductRequest): Promise<Product> => {
  return await jsonHttp
    .put(`/api/products/${id}/`, product) 
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error.response.data
    })
}
