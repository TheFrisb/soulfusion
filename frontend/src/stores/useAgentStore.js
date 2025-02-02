import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { fetchAgents } from '@/http/agents.js'

export const useAgentStore = defineStore('agentStore', () => {
  const toast = useToast()

  const agents = ref([])
  const loading = ref(false)

  async function loadAgents() {
    loading.value = true

    try {
      const response = await fetchAgents()
      agents.value = response
    } catch (error) {
      console.error(error)
      toast.error('Error loading agents')
    } finally {
      loading.value = false
    }
  }

  return {
    agents,
    loading,
    loadAgents,
  }
})
