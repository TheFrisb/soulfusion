import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { getMe } from '@/http/auth.js'

const toast = useToast()

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)

  async function updateSession() {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
      clearUser()
      return false
    }

    try {
      const data = await getMe()
      setUser(data)
      console.log(`update session: ${data}`)
    } catch (error) {
      console.log(error)
    }
  }

  function isAuthenticated() {
    return user.value !== null
  }

  function clearUser() {
    user.value = null
  }

  function setUser(data) {
    user.value = data
  }

  function logoutUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    clearUser()
  }

  return {
    user,
    isAuthenticated,
    clearUser,
    setUser,
    updateSession,
    logoutUser,
  }
})
