import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore.js'

export function useLogout() {
  const authStore = useAuthStore()
  const router = useRouter()
  const toast = useToast()
  const logoutAndRedirect = async () => {
    authStore.logoutUser()

    toast.success('You have been logged out')
    await router.push({ name: 'LoginView' })
  }

  return { logoutAndRedirect }
}
