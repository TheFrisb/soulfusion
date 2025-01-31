import axios from 'axios'
import { handleRequestError } from '@/http/handlers/requestErrorHandler'

const baseURL = import.meta.env.VITE_API_URL
console.log(`baseURL: ${baseURL}`)

const commonConfig = {
  baseURL,
  headers: {
    Accept: 'application/json',
  },
}

const addAuthToken = (config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export const jsonHttp = axios.create({
  ...commonConfig,
  headers: {
    ...commonConfig.headers,
    'Content-Type': 'application/json',
  },
})

export const formDataHttp = axios.create({
  ...commonConfig,
  headers: {
    ...commonConfig.headers,
    'Content-Type': 'multipart/form-data',
  },
})

jsonHttp.interceptors.request.use(addAuthToken, handleRequestError)
jsonHttp.interceptors.response.use((response) => response, handleRequestError)
formDataHttp.interceptors.request.use(addAuthToken, handleRequestError)
formDataHttp.interceptors.response.use((response) => response, handleRequestError)
