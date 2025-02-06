<script setup>
import { computed, ref } from 'vue'
import { getOrderProductName, getOrderQuantity } from '@/utils/helpers.js'
import { useToast } from 'vue-toastification'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const toast = useToast({
  position: 'bottom-right',
})

const emit = defineEmits(['close', 'confirm'])
const quantity = ref(getOrderQuantity(props.order))
const showCommentForm = ref(false)
const comment = ref('')
const address = ref('')

function handleConfirm() {
  if (!showCommentForm.value) {
    if (!address.value) {
      toast.error('Please provide a delivery address')
      return
    }

    showCommentForm.value = true
    return
  }

  emit('confirm', {
    quantity: quantity.value,
    address: address.value,
    comment: comment.value,
  })
}

const totalPrice = computed(() => {
  return (props.order.order_item.price * quantity.value).toFixed(2)
})
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ showCommentForm ? `Add Comment for ${order.customer.name}` : 'Confirm Order' }}
        </h2>
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
      <div class="p-6">
        <div v-if="!showCommentForm" class="space-y-6">
          <!-- Customer Details -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Full Name </label>
              <p class="text-gray-900 font-semibold">{{ order.customer.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Phone Number </label>
              <p class="text-gray-900 font-bold">{{ order.customer.phone }}</p>
            </div>
          </div>

          <!-- Delivery Address -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Delivery Address </label>
            <input
              v-model="address"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <!-- Product Details -->
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Product </label>
              <p class="text-gray-900">{{ getOrderProductName(order) }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Quantity </label>
              <input
                v-model="quantity"
                type="number"
                min="1"
                class="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Total Price </label>
              <p class="text-gray-900">${{ totalPrice }}</p>
            </div>
          </div>
        </div>

        <!-- Comment Form -->
        <div v-else class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Comment </label>
            <textarea
              v-model="comment"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Add your comment here..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          @click="emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Close
        </button>
        <button
          @click="handleConfirm"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
        >
          {{ showCommentForm ? 'Comment' : 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>
