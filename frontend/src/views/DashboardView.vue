<script setup>
import { computed, onMounted, ref } from 'vue'
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import DateFilter from '../components/dashboard/DateFilter.vue'
import StatusCount from '../components/dashboard/StatusCount.vue'
import { Calendar } from 'lucide-vue-next'
import { fetchOrders } from '@/http/orders.js'
import ORDER_STATUS from '@/utils/constants/orderStatus.js'

const orders = ref([])
const selectedPeriod = ref('today')
const searchQuery = ref('')
const selectedCustomer = ref(null)

onMounted(async () => {
  try {
    orders.value = await fetchOrders()
  } catch (error) {
    console.error(error)
  }
})

const statusCounts = computed(() => {
  const counts = {
    [ORDER_STATUS.PENDING]: 0,
    [ORDER_STATUS.TAKE]: 0,
    [ORDER_STATUS.CALL_AGAIN]: 0,
    [ORDER_STATUS.CONFIRMED]: 0,
    [ORDER_STATUS.SHIPPED]: 0,
    [ORDER_STATUS.RETURNED]: 0,
    [ORDER_STATUS.PAID]: 0,
    [ORDER_STATUS.TRASHED]: 0,
    [ORDER_STATUS.CANCELLED]: 0,
  }

  orders.value.forEach((order) => {
    if (Object.prototype.hasOwnProperty.call(counts, order.status)) {
      counts[order.status]++
    }
  })

  return Object.entries(counts).map(([status, count]) => ({ status, count }))
})
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
              <Calendar class="w-5 h-5" />
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
          <StatusCount :statusCounts="statusCounts" />

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
              <template v-for="order in orders" :key="order.id">
                <OrderRow :order="order" @showCustomerHistory="showCustomerHistory" />
              </template>
            </tbody>
          </table>
        </div>

        <!--        <CustomerHistoryModal-->
        <!--          v-if="selectedCustomer"-->
        <!--          :customer="selectedCustomer"-->
        <!--          :orders="orders.filter((order) => order.customer?.id === selectedCustomer.id)"-->
        <!--          @close="selectedCustomer = null"-->
        <!--        />-->
      </div>
    </main>
  </div>
</template>
