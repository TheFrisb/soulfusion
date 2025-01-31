<script setup>
import { computed, ref } from 'vue'
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import DateFilter from '../components/dashboard/DateFilter.vue'
import StatusCount from '../components/dashboard/StatusCount.vue'
import CallRow from '../components/dashboard/CallRow.vue'
import CustomerHistoryModal from '../components/dashboard/CustomerHistoryModal.vue'

const selectedPeriod = ref('today')
const selectedCustomer = ref(null)
const searchQuery = ref('')
const showStatusDropdown = ref(null)

const statuses = [
  'pending',
  'take',
  'callAgain',
  'confirmed',
  'shipped',
  'returned',
  'paid',
  'trash',
  'canceled',
]

// Mock data for demonstration
const calls = [
  {
    id: '1',
    status: 'pending',
    productId: 'P001',
    productName: 'Premium Widget',
    quantity: 2,
    totalPrice: 199.99,
    clickId: '1',
    createdAt: '2024-02-20 14:30',
    agent: null,
    stock: 150,
    comments: null,
    customer: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: '2',
    status: 'confirmed',
    productId: 'P002',
    productName: 'Super Gadget',
    quantity: 1,
    totalPrice: 299.99,
    clickId: '2',
    createdAt: '2024-02-20 15:45',
    agent: 'Jane Smith',
    stock: 75,
    comments: [
      {
        id: '1',
        text: 'Customer requested express shipping',
        agent: 'Jane Smith',
        createdAt: '2024-02-20 15:46',
      },
    ],
    customer: null,
  },
  {
    id: '3',
    status: 'paid',
    productId: 'P003',
    productName: 'Deluxe Package',
    quantity: 3,
    totalPrice: 599.99,
    clickId: '3',
    createdAt: '2024-02-20 16:15',
    agent: 'Bob Wilson',
    stock: 200,
    comments: [
      {
        id: '1',
        text: 'Follow-up order from previous purchase. Very satisfied customer.',
        agent: 'Bob Wilson',
        createdAt: '2024-02-20 16:16',
      },
      {
        id: '2',
        text: 'Customer mentioned interest in bulk ordering next month',
        agent: 'Bob Wilson',
        createdAt: '2024-02-20 16:20',
      },
    ],
    customer: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: '4',
    status: 'shipped',
    productId: 'P004',
    productName: 'Basic Kit',
    quantity: 1,
    totalPrice: 99.99,
    clickId: '4',
    createdAt: '2024-02-20 17:00',
    agent: 'Alice Johnson',
    stock: 100,
    comments: [
      {
        id: '1',
        text: 'First time customer, interested in premium packages',
        agent: 'Alice Johnson',
        createdAt: '2024-02-20 17:01',
      },
      {
        id: '2',
        text: 'Scheduled follow-up call for next week',
        agent: 'Alice Johnson',
        createdAt: '2024-02-20 17:05',
      },
    ],
    customer: {
      id: '2',
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+1 (555) 987-6543',
    },
  },
  {
    id: '5',
    status: 'returned',
    productId: 'P005',
    productName: 'Premium Bundle',
    quantity: 2,
    totalPrice: 399.99,
    clickId: '5',
    createdAt: '2024-02-20 17:30',
    agent: 'Jane Smith',
    stock: 50,
    comments: [
      {
        id: '1',
        text: 'Product returned due to size mismatch. Customer wants to exchange.',
        agent: 'Jane Smith',
        createdAt: '2024-02-20 17:31',
      },
      {
        id: '2',
        text: 'Processed exchange request for smaller size',
        agent: 'Jane Smith',
        createdAt: '2024-02-20 17:35',
      },
      {
        id: '3',
        text: 'New order created with correct size',
        agent: 'Jane Smith',
        createdAt: '2024-02-20 17:40',
      },
    ],
    customer: {
      id: '2',
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+1 (555) 987-6543',
    },
  },
]

const filteredCalls = computed(() => {
  return calls.filter((call) => {
    if (!searchQuery.value) return true
    return call.productName.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

function updateCallStatus(callId, newStatus) {
  const call = calls.find((c) => c.id === callId)
  if (call) call.status = newStatus
  showStatusDropdown.value = null
}

function handlePeriodChange(period) {
  selectedPeriod.value = period
}

function showCustomerHistory(customer) {
  selectedCustomer.value = customer
}
</script>

<template>
  <div class="min-h-screen bg-background-secondary">
    <TopBar />
    <SideBar />

    <!-- Main Content -->
    <main class="md:ml-64 p-4 md:p-16 mt-16">
      <div class="mx-auto">
        <div class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-brand-soul to-brand-fusion bg-clip-text text-transparent"
            >
              Orders Dashboard
            </h1>

            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{{
                new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}</span>
            </div>
          </div>
          <DateFilter @period-change="handlePeriodChange" />
        </div>

        <!-- Combined Status and Orders Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <!-- Status Counts -->
          <StatusCount />

          <!-- Divider -->
          <div class="h-px bg-transparent mx-6" />

          <div class="px-6 py-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-gray-900">Orders</h2>
              <span class="hidden md:inline text-sm text-gray-600">
                Showing orders for:
                <span class="font-medium text-gray-900">
                  {{ selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1) }}
                </span>
              </span>
            </div>

            <!-- Search Field -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Order"
                class="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Desktop Table -->
          <table class="hidden md:table w-full">
            <thead>
              <tr class="bg-gray-50 border-y border-gray-200">
                <th
                  class="w-[180px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  class="w-[300px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Products
                </th>
                <th
                  class="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Price
                </th>
                <th
                  class="w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
                <th class="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-for="call in calls" :key="call.id">
                <CallRow :call="call" @showCustomerHistory="showCustomerHistory" />
              </template>
            </tbody>
          </table>

          <!-- Mobile List -->
          <div class="md:hidden divide-y divide-gray-200">
            <div v-for="call in calls" :key="call.id" class="p-4 space-y-3">
              <div class="flex items-center justify-between">
                <StatusBadge :status="call.status" />
                <span class="text-sm font-medium text-gray-900">#{{ call.clickId }}</span>
              </div>

              <div>
                <p class="text-sm text-gray-600">{{ call.productName }} x {{ call.quantity }}</p>
                <p class="text-sm font-medium text-gray-900 mt-1">${{ call.totalPrice }}</p>
              </div>

              <div class="flex items-center justify-between">
                <div class="relative">
                  <div v-if="call.agent" class="flex items-center space-x-2">
                    <span class="text-sm text-gray-900">{{ call.agent }}</span>
                  </div>
                  <button
                    v-else
                    class="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    Assign Agent
                  </button>
                </div>

                <button
                  class="text-gray-400 hover:text-primary-600"
                  @click="isExpanded = !isExpanded"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer History Modal -->
        <CustomerHistoryModal
          v-if="selectedCustomer"
          :customer="selectedCustomer"
          :calls="calls.filter((call) => call.customer?.id === selectedCustomer.id)"
          @close="selectedCustomer = null"
        />
      </div>
    </main>
  </div>
</template>
