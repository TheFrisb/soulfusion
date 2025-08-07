<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import StatusBadge from './StatusBadge.vue'
import {
  formatDate,
  getAgentName,
  getOrderProductName,
  getOrderQuantity,
  getOrderTotalPrice,
} from '@/utils/helpers.js'
import { ORDER_STATUS_CSS_MAP, ORDER_STATUS_LIST } from '@/utils/constants/orderStatus.js'
import { CheckCheck } from 'lucide-vue-next'
import { useOrdersStore } from '@/stores/useOrdersStore.ts'
import { useUsersStore } from '@/stores/useUsersStore.ts'
import { onClickOutside } from '@vueuse/core'
import AgentAssignButton from './AgentAssignButton.vue'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const ordersStore = useOrdersStore()
const agentStore = useUsersStore()

const emit = defineEmits<{
  (e: 'showCustomerHistory', customer: any): void
  (e: 'agent-selected', agentId: number | null): void
}>()

const isExpanded = ref(false)
const showAgentDropdown = ref(false)
const agentSearch = ref('')

const showStatusDropdown = ref(false)
const statuses = ORDER_STATUS_LIST

// Define refs for the dropdown container elements
const statusDropdownRef = ref(null)
const agentDropdownRef = ref(null)

onClickOutside(statusDropdownRef, () => {
  showStatusDropdown.value = false
})

onClickOutside(agentDropdownRef, () => {
  showAgentDropdown.value = false
})

function assignAgent(agentId: number) {
  ordersStore.assignOrderToAgent(props.order.id, agentId)
  emit('agent-selected', agentId)
  showAgentDropdown.value = false
}

function updateOrderStatus(status) {
  ordersStore.changeOrderStatus(props.order.id, status)
  showStatusDropdown.value = false
}

function clearOrderAgent() {
  ordersStore.removeAgentFromOrder(props.order.id)
  showAgentDropdown.value = false
}

function handleAgentSelected(agentId: number | null) {
  if (agentId === null) {
    ordersStore.removeAgentFromOrder(props.order.id)
  } else {
    ordersStore.assignOrderToAgent(props.order.id, agentId)
  }
  emit('agent-selected', agentId)
}

const filteredAgents = computed(() => {
  const search = agentSearch.value.toLowerCase()
  return (agentStore.users || []).filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search)
  )
})

onMounted(() => {
  if (!agentStore.users || agentStore.users.length === 0) {
    agentStore.loadUsers()
  }
})
</script>

<template>
  <!-- Main Row -->
  <tr
    class="hover:bg-gray-50 transition-colors cursor-pointer"
    :class="{ 'bg-gray-50': isExpanded }"
    @click="isExpanded = !isExpanded"
  >
    <td class="px-6 py-4 w-[180px]">
      <div class="relative" ref="statusDropdownRef">
        <button @click.stop="showStatusDropdown = !showStatusDropdown" class="w-auto text-left">
          <StatusBadge :status="order.status" />
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
              @click="updateOrderStatus(status)"
              class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <div class="w-3 h-3 rounded-full" :class="ORDER_STATUS_CSS_MAP[status].bg" />
              <span
                class="capitalize"
                :class="{
                  'text-gray-900 font-bold': order.status === status,
                  'text-gray-600': order.status !== status,
                }"
              >
                {{ status }}
              </span>

              <CheckCheck v-if="order.status === status" class="w-6 h-6 text-brand-soul" />
            </button>
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 w-[200px]">
      <span class="text-sm font-medium text-gray-900">#{{ order.id }}</span>
    </td>
    <td class="px-6 py-4 w-[300px]">
      <span class="text-sm text-gray-600">
        {{ getOrderProductName(order) }} x {{ getOrderQuantity(order) }}
      </span>
    </td>
    <td class="px-6 py-4 w-[150px]">
      <span class="text-sm font-medium text-gray-900">{{ getOrderTotalPrice(order) }} MKD</span>
    </td>
    <td class="px-6 py-4 w-[200px]">
      <AgentAssignButton :agent="order.agent" @agent-selected="handleAgentSelected" />
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
            <span class="ml-2 text-gray-600">{{ order.id }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Created:</span>
            <span class="ml-2 text-gray-600">{{ formatDate(order.created_at) }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Agent:</span>
            <span class="ml-2 text-gray-600">{{ getAgentName(order.agent) || 'Unassigned' }}</span>
          </div>
        </div>

        <!-- Customer Details Section -->
        <div class="space-y-3 py-3">
          <!-- Customer Name and History -->
          <div class="flex items-center justify-start gap-2">
            <span class="font-medium text-gray-700">Customer:</span>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-gray-900">{{ order.customer.name }}</span>

                <button
                  v-if="order.customer.has_history"
                  @click.stop="emit('showCustomerHistory', order.customer)"
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
            <span class="ml-2 text-gray-600">{{ order.customer?.phone || 'N/A' }}</span>
          </div>

          <!-- Address -->
          <div>
            <span class="font-medium text-gray-700">Address:</span>
            <span class="ml-2 text-gray-600">{{ order.address || 'N/A' }}</span>
          </div>
        </div>

        <!-- Stock Section -->
        <div class="pt-3">
          <div>
            <span class="font-medium text-gray-700">Product Stock:</span>
            <span class="ml-2 text-gray-600">{{ order.order_item.product.stock }} units</span>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>
