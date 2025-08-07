<script setup lang="ts">
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import StatusBadge from '../components/dashboard/StatusBadge.vue'
import { usePendingOrdersStore } from '@/stores/usePendingOrdersStore.ts'
import {
  getCurrentDate,
  getOrderProductName,
  getOrderQuantity,
  getOrderTotalPrice,
} from '../utils/helpers.js'

const pendingOrdersStore = usePendingOrdersStore()

pendingOrdersStore.loadPendingOrders()
</script>

<template>
  <div class="min-h-screen bg-background-secondary">
    <TopBar />
    <SideBar />

    <!-- Main Content -->
    <main class="ml-64 p-16 mt-16">
      <div class="mx-auto">
        <div class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-brand-soul to-brand-fusion bg-clip-text text-transparent"
            >
              Assigned to me
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
              <span>{{ getCurrentDate() }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <table class="w-full">
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
                  Customer
                </th>
                <th
                  class="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="order in pendingOrdersStore.pendingOrders"
                :key="order.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <StatusBadge :status="order.status" />
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-900">#{{ order.id }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-600">
                    {{ getOrderProductName(order) }} x {{ getOrderQuantity(order) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-900"
                    >{{ getOrderTotalPrice(order) }} MKD</span
                  >
                </td>
                <td class="px-6 py-4">
                  <span
                    v-if="order.customer.has_history"
                    class="text-sm text-primary-600 hover:text-primary-700 cursor-pointer flex items-center gap-1"
                    @click="selectedCustomer = order.customer"
                  >
                    {{ order.customer.name }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>

                  <span v-else class="text-sm text-gray-600">{{ order.customer.name }}</span>
                </td>
                <td class="px-6 py-4">
                  <router-link
                    :to="`/order/${order.id}`"
                    class="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1"
                  >
                    Call
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Customer History Modal -->
          <!--          <CustomerHistoryModal-->
          <!--            v-if="selectedCustomer"-->
          <!--            :customer="selectedCustomer"-->
          <!--            :calls="orders.filter((call) => call.customer?.id === selectedCustomer.id)"-->
          <!--            @close="selectedCustomer = null"-->
          <!--          />-->
        </div>
      </div>
    </main>
  </div>
</template>
