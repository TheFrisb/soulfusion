import { jsonHttp } from '@/http/http.js'

export const fetchAgents = async () => {
  return await jsonHttp
    .get('/api/accounts/users/')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data
    })
}
