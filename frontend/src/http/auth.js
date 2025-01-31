import { jsonHttp } from './http'
import { useAuthStore } from '@/stores/authStore'

export const authenticate = async (credentials) => {
  const authStore = useAuthStore()
  return jsonHttp
    .post('/api/accounts/auth/login/', credentials)
    .then((response) => {
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      authStore.updateSession()
      return response
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export const fetchAccessToken = async (refreshToken) => {
  return jsonHttp
    .post('/api/accounts/auth/refresh-token/', { refresh: refreshToken })
    .then((response) => {
      localStorage.setItem('accessToken', response.data.access)
      return response.data.access
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export const getMe = async () => {
  return jsonHttp
    .get('/api/accounts/me/')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}
