<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  customer: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      email: '',
      phone: '',
    }),
  },
  calls: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['close'])

const sortedCalls = computed(() => {
  return [...props.calls].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}, ${date
    .getDate()
    .toString()
    .padStart(
      2,
      '0',
    )}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-1">
            {{ customer.name }}
          </h2>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>{{ customer.email }}</span>
            <span>{{ customer.phone }}</span>
          </div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-500 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="space-y-6">
          <div
            v-for="call in sortedCalls"
            :key="call.id"
            class="bg-white rounded-lg p-6 space-y-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <!-- Header Section -->
            <div class="flex items-center justify-between border-b border-gray-100 pb-4">
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-gray-500">Order ID: </span>
                <span class="text-sm font-bold text-gray-900">#{{ call.clickId }}</span>
                <StatusBadge :status="call.status" />
              </div>
              <span class="text-sm font-medium text-gray-600">{{
                formatDate(call.createdAt)
              }}</span>
            </div>

            <!-- Order Details -->
            <div class="grid grid-cols-3 gap-6 py-4 border-b border-gray-100">
              <div>
                <span class="text-xs uppercase tracking-wider text-gray-500">Products</span>
                <p class="mt-1 text-sm font-medium text-gray-900">
                  {{ call.productName }} x {{ call.quantity }}
                </p>
              </div>
              <div>
                <span class="text-xs uppercase tracking-wider text-gray-500">Total Price</span>
                <p class="mt-1 text-sm font-medium text-gray-900">
                  ${{ call.totalPrice.toFixed(2) }}
                </p>
              </div>
              <div>
                <span class="text-xs uppercase tracking-wider text-gray-500">Agent</span>
                <p class="mt-1 text-sm font-medium text-gray-900">
                  <span :class="call.agent ? 'text-primary-600' : ''">
                    {{ call.agent || 'Unassigned' }}
                  </span>
                </p>
              </div>
            </div>

            <!-- Comments Section -->
            <div class="pt-4">
              <h4 class="text-sm font-semibold text-gray-900 mb-3">Comments</h4>
              <div class="space-y-3">
                <div
                  v-for="comment in call.comments"
                  :key="comment.id"
                  class="bg-blue-50 rounded-lg p-3 space-y-2"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-primary-600">{{ comment.agent }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="text-sm text-gray-700">{{ comment.text }}</p>
                </div>
                <p v-if="!call.comments?.length" class="text-sm text-gray-500 italic">
                  No comments yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
