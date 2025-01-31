<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import StatusBadge from '../components/dashboard/StatusBadge.vue'
import ProductInfoModal from '../components/dashboard/ProductInfoModal.vue'
import ConfirmOrderModal from '../components/dashboard/ConfirmOrderModal.vue'

const router = useRouter()
const newComment = ref('')
const showProductInfo = ref(false)
const showConfirmModal = ref(false)

// Mock data for the current order
const order = {
  id: '1',
  status: 'take',
  productId: 'P001',
  productName: 'Premium Widget',
  quantity: 2,
  totalPrice: 199.99,
  clickId: '1',
  createdAt: '2024-02-20 14:30',
  agent: 'John Doe',
  customer: {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
  },
  comments: [
    {
      id: '1',
      text: 'Initial contact made',
      agent: 'John Doe',
      createdAt: '2024-02-20 14:35',
    },
  ],
}

// Mock data for customer's order history
const customerHistory = [
  {
    id: '2',
    status: 'paid',
    productId: 'P003',
    productName: 'Deluxe Package',
    quantity: 3,
    totalPrice: 599.99,
    clickId: '3',
    createdAt: '2024-02-19 16:15',
    agent: 'Bob Wilson',
    comments: [
      {
        id: '1',
        text: 'Follow-up order from previous purchase. Very satisfied customer.',
        agent: 'Bob Wilson',
        createdAt: '2024-02-19 16:16',
      },
      {
        id: '2',
        text: 'Customer mentioned interest in bulk ordering next month',
        agent: 'Bob Wilson',
        createdAt: '2024-02-19 16:20',
      },
    ],
    customer: order.customer,
  },
  {
    id: '3',
    status: 'shipped',
    productId: 'P002',
    productName: 'Premium Widget Pro',
    quantity: 1,
    totalPrice: 299.99,
    clickId: '4',
    createdAt: '2024-02-18 10:30',
    agent: 'Jane Smith',
    comments: [
      {
        id: '1',
        text: 'Customer requested express shipping',
        agent: 'Jane Smith',
        createdAt: '2024-02-18 10:35',
      },
    ],
    customer: order.customer,
  },
]

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

function addComment() {
  if (!newComment.value.trim()) return

  order.comments.push({
    id: Date.now().toString(),
    text: newComment.value,
    agent: 'John Doe',
    createdAt: new Date().toISOString(),
  })

  newComment.value = ''
}

async function updateStatus(newStatus) {
  if (newStatus === 'confirmed') {
    showConfirmModal.value = true
    return
  }

  order.status = newStatus
  router.push('/my-pendings')
}

function handleOrderConfirm({ quantity, address, comment }) {
  order.quantity = quantity
  order.customer.address = address
  if (comment) {
    order.comments.push({
      id: Date.now().toString(),
      text: comment,
      agent: 'John Doe',
      createdAt: new Date().toISOString(),
    })
  }
  order.status = 'confirmed'
  showConfirmModal.value = false
  router.push('/my-pendings')
}
</script>

<template>
  <div class="min-h-screen bg-background-secondary">
    <TopBar />
    <SideBar />

    <!-- Main Content -->
    <main class="ml-64 p-16 mt-16">
      <div class="mx-auto">
        <!-- Back Button -->
        <button
          @click="router.push('/my-pendings')"
          class="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="font-medium">Go Back</span>
        </button>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <!-- Order Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 mb-2">Order #{{ order.clickId }}</h1>
              <StatusBadge :status="order.status" />
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <button
                @click="updateStatus('callAgain')"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Call Again
              </button>
              <button
                @click="updateStatus('confirmed')"
                class="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Confirm
              </button>
              <button
                @click="updateStatus('trash')"
                class="px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Trash
              </button>
              <button
                @click="updateStatus('canceled')"
                class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Customer Details -->
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Customer Details</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-sm text-gray-500">Full Name</span>
                <p class="text-gray-900 font-semibold">{{ order.customer.name }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-500">Phone</span>
                <p class="text-gray-900 font-bold">{{ order.customer.phone }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-500">Email</span>
                <p class="text-gray-900 font-medium">{{ order.customer.email }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-500">Address</span>
                <p class="text-gray-900 font-medium">{{ order.customer.address }}</p>
              </div>
            </div>
          </div>

          <!-- Order Details -->
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <span class="text-sm text-gray-500">Product</span>
                <p class="text-gray-900 font-medium">{{ order.productName }}</p>
                <button
                  @click="showProductInfo = true"
                  class="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                >
                  Product Information
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <span class="text-sm text-gray-500">Quantity</span>
                <p class="text-gray-900 font-medium">{{ order.quantity }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-500">Total Price</span>
                <p class="text-gray-900 font-medium">${{ order.totalPrice }}</p>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Comments</h2>

            <!-- Add Comment -->
            <div class="mb-6">
              <div class="flex gap-3">
                <input
                  v-model="newComment"
                  type="text"
                  placeholder="Add a comment..."
                  class="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  @keyup.enter="addComment"
                />
                <button
                  @click="addComment"
                  class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Add Comment
                </button>
              </div>
            </div>

            <!-- Comments List -->
            <div class="space-y-4">
              <div
                v-for="comment in order.comments"
                :key="comment.id"
                class="bg-blue-50 rounded-lg p-4"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-primary-600">{{ comment.agent }}</span>
                  <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                </div>
                <p class="text-sm text-gray-700">{{ comment.text }}</p>
              </div>
            </div>
          </div>

          <!-- Customer History Section -->
          <div class="mt-12 pt-8 border-t border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Customer History</h2>
            <div class="space-y-6">
              <div
                v-for="historyOrder in customerHistory"
                :key="historyOrder.id"
                class="bg-white rounded-lg p-6 space-y-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <!-- Header Section -->
                <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-medium text-gray-500">Order ID: </span>
                    <span class="text-sm font-bold text-gray-900">#{{ historyOrder.clickId }}</span>
                    <StatusBadge :status="historyOrder.status" />
                  </div>
                  <span class="text-sm font-medium text-gray-600">{{
                    formatDate(historyOrder.createdAt)
                  }}</span>
                </div>

                <!-- Order Details -->
                <div class="grid grid-cols-3 gap-6 py-4 border-b border-gray-100">
                  <div>
                    <span class="text-xs uppercase tracking-wider text-gray-500">Products</span>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ historyOrder.productName }} x {{ historyOrder.quantity }}
                    </p>
                  </div>
                  <div>
                    <span class="text-xs uppercase tracking-wider text-gray-500">Total Price</span>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      ${{ historyOrder.totalPrice.toFixed(2) }}
                    </p>
                  </div>
                  <div>
                    <span class="text-xs uppercase tracking-wider text-gray-500">Agent</span>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      <span :class="historyOrder.agent ? 'text-primary-600' : ''">
                        {{ historyOrder.agent || 'Unassigned' }}
                      </span>
                    </p>
                  </div>
                </div>

                <!-- Comments Section -->
                <div class="pt-4">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Comments</h4>
                  <div class="space-y-3">
                    <div
                      v-for="comment in historyOrder.comments"
                      :key="comment.id"
                      class="bg-blue-50 rounded-lg p-3 space-y-2"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-primary-600">{{
                          comment.agent
                        }}</span>
                        <span class="text-xs text-gray-500">{{
                          formatDate(comment.createdAt)
                        }}</span>
                      </div>
                      <p class="text-sm text-gray-700">{{ comment.text }}</p>
                    </div>
                    <p v-if="!historyOrder.comments?.length" class="text-sm text-gray-500 italic">
                      No comments yet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Information Modal -->
        <ProductInfoModal
          v-if="showProductInfo"
          :product-name="order.productName"
          @close="showProductInfo = false"
        />

        <!-- Confirm Order Modal -->
        <ConfirmOrderModal
          v-if="showConfirmModal"
          :order="order"
          @close="showConfirmModal = false"
          @confirm="handleOrderConfirm"
        />
      </div>
    </main>
  </div>
</template>
