<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUsersStore } from '@/stores/useUsersStore.ts'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  agent: any | null
}>()

const emit = defineEmits<{
  (e: 'agent-selected', agentId: number | null): void
}>()

const usersStore = useUsersStore()

const showAgentDropdown = ref(false)
const agentSearch = ref('')
const dropdownRef = ref<HTMLElement | null>(null)

const filteredAgents = computed(() => {
  const search = agentSearch.value.toLowerCase()
  return (usersStore.users || []).filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search)
  )
})

onMounted(() => {
  if (!usersStore.users || usersStore.users.length === 0) {
    usersStore.loadUsers()
  }
})

onClickOutside(dropdownRef, () => {
  showAgentDropdown.value = false
})

function selectAgent(agentId: number) {
  emit('agent-selected', agentId)
  showAgentDropdown.value = false
}

function clearAgent() {
  emit('agent-selected', null)
  showAgentDropdown.value = false
}
</script>

<template>
  <div class="relative">
    <div v-if="props.agent" class="flex items-center space-x-2" @click.stop="showAgentDropdown = true">
      <span class="text-sm text-gray-900">{{ props.agent.first_name }} {{ props.agent.last_name }}</span>
      <button class="p-1 text-gray-400 hover:text-primary-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
    <button
      v-else
      class="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-brand-soul to-brand-fusion text-white rounded-lg shadow hover:from-brand-fusion hover:to-brand-soul transition-colors focus:outline-none focus:ring-2 focus:ring-brand-fusion"
      @click.stop="showAgentDropdown = true"
    >
      Assign Agent
    </button>
    <div
      v-if="showAgentDropdown"
      ref="dropdownRef"
      class="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200"
      @click.stop
    >
      <div class="p-2">
        <input v-model="agentSearch" type="text" placeholder="Search agents..." class="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <div class="max-h-48 overflow-y-auto">
        <button class="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50" @click="clearAgent">
          Unassigned
        </button>
        <button v-for="user in filteredAgents" :key="user.id" class="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-50" @click="selectAgent(user.id)">
          {{ user.first_name }} {{ user.last_name }}
        </button>
      </div>
    </div>
  </div>
</template> 