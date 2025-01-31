<script setup>
import { computed, ref } from 'vue'
import StatusBadge from './StatusBadge.vue'

// Mock agents data
const agents = [
  { id: 0, name: 'John Doe' },
  { id: 1, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Wilson' },
  { id: 5, name: 'Sarah Davis' },
]

const props = defineProps({
  order: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      stock: 0,
      status: '',
      productId: '',
      productName: '',
      quantity: 0,
      totalPrice: 0,
      clickId: '',
      createdAt: '',
      agent: null,
      comments: null,
      customer: null,
    }),
  },
})

const emit = defineEmits(['showCustomerHistory'])

const isExpanded = ref(false)
const showAgentDropdown = ref(false)
const agentSearch = ref('')

const filteredAgents = computed(() => {
  const search = agentSearch.value.toLowerCase()
  return agents.filter((agent) => agent.name.toLowerCase().includes(search))
})

const showStatusDropdown = ref(false)
const statuses = [
  'pending',
  'take',
  'callgain',
  'confirmed',
  'shipped',
  'returned',
  'paid',
  'trash',
  'canceled',
]

const formattedDate = computed(() => {
  const date = new Date(props.call.createdAt)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}, ${date
    .getDate()
    .toString()
    .padStart(
      2,
      '0',
    )}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`
})

function assignAgent(agentName) {
  props.call.agent = agentName
  showAgentDropdown.value = false
  agentSearch.value = ''
}

function updateStatus(newStatus) {
  props.call.status = newStatus
  showStatusDropdown.value = false
}
</script>

<template>
  <!-- Main Row -->
  <tr
    class="hover:bg-gray-50 transition-colors cursor-pointer"
    :class="{ 'bg-gray-50': isExpanded }"
    @click="isExpanded = !isExpanded"
  >
    <td class="px-6 py-4 w-[180px]">
      <div class="relative">
        <button @click.stop="showStatusDropdown = !showStatusDropdown" class="w-full text-left">
          <StatusBadge :status="call.status" />
        </button>

        <!-- Status Dropdown -->
        <div
          v-if="showStatusDropdown"
          class="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
          @click.stop
        >
          <div class="py-1">
            <button
              v-for="status in statuses"
              :key="status"
              @click="updateStatus(status)"
              class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <div class="w-3 h-3 rounded-full" :class="`bg-status-${status}`" />
              <span
                class="capitalize"
                :class="{
                  'text-gray-900 font-medium': call.status === status,
                  'text-gray-600': call.status !== status,
                }"
              >
                {{ status }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 w-[200px]">
      <span class="text-sm font-medium text-gray-900">#{{ call.clickId }}</span>
    </td>
    <td class="px-6 py-4 w-[300px]">
      <span class="text-sm text-gray-600"> {{ call.productName }} x {{ call.quantity }} </span>
    </td>
    <td class="px-6 py-4 w-[150px]">
      <span class="text-sm font-medium text-gray-900">${{ call.totalPrice }}</span>
    </td>
    <td class="px-6 py-4 w-[200px]">
      <div class="relative">
        <div v-if="call.agent" class="flex items-center space-x-2">
          <span class="text-sm text-gray-900">{{ call.agent }}</span>
          <button
            class="p-1 text-gray-400 hover:text-primary-600"
            @click.stop="showAgentDropdown = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        <button
          v-else
          class="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          @click.stop="showAgentDropdown = true"
        >
          Assign Agent
        </button>

        <!-- Agent Dropdown -->
        <div
          v-if="showAgentDropdown"
          class="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200"
          @click.stop
        >
          <div class="p-2">
            <input
              v-model="agentSearch"
              type="text"
              placeholder="Search agents..."
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div class="max-h-48 overflow-y-auto">
            <button
              class="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
              @click="assignAgent(null)"
            >
              Unassigned
            </button>
            <button
              v-for="agent in filteredAgents"
              :key="agent.id"
              class="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-50"
              @click="assignAgent(agent.name)"
            >
              {{ agent.name }}
            </button>
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 w-10">
      <svg
        class="w-5 h-5 text-gray-400 transition-all group-hover:text-primary-600"
        :class="{ 'transform rotate-180': isExpanded }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </td>
  </tr>

  <!-- Expanded Row -->
  <tr v-if="isExpanded">
    <td colspan="6" class="px-6 py-4 bg-white border-t border-gray-200">
      <div class="divide-y divide-gray-200 space-y-3">
        <!-- Order Info Section -->
        <div class="space-y-3 py-3">
          <div>
            <span class="font-medium text-gray-700">Click ID:</span>
            <span class="ml-2 text-gray-600">{{ call.clickId }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Created:</span>
            <span class="ml-2 text-gray-600">{{ formattedDate }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Agent:</span>
            <span class="ml-2 text-gray-600">{{ call.agent || 'Unassigned' }}</span>
          </div>
        </div>

        <!-- Customer Details Section -->
        <div class="space-y-3 py-3">
          <!-- Customer Name and History -->
          <div class="flex items-center justify-start gap-2">
            <span class="font-medium text-gray-700">Customer:</span>
            <div>
              <span v-if="!call.customer" class="text-gray-600">None</span>
              <div v-else class="flex items-center gap-2">
                <span class="text-gray-900">{{ call.customer.name }}</span>

                <button
                  @click.stop="emit('showCustomerHistory', call.customer)"
                  class="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                >
                  View History
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <span class="font-medium text-gray-700">Phone:</span>
            <span class="ml-2 text-gray-600">{{ call.customer?.phone || 'N/A' }}</span>
          </div>

          <!-- Address -->
          <div>
            <span class="font-medium text-gray-700">Address:</span>
            <span class="ml-2 text-gray-600">Leninova 99</span>
          </div>
        </div>

        <!-- Stock Section -->
        <div class="pt-3">
          <div>
            <span class="font-medium text-gray-700">Product Stock:</span>
            <span class="ml-2 text-gray-600">{{ call.stock }} units</span>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>
