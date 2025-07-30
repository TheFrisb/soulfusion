<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import { userOrderImportsStore } from '@/stores/useOrderImportStore.ts'
import type { OrderImport } from '@/types/order-import.ts'
import { Loader2 } from 'lucide-vue-next'
import OrderRow from '@/components/dashboard/OrderRow.vue'
import { useOrdersStore } from '@/stores/useOrdersStore.ts'
import { useUsersStore } from '@/stores/useUsersStore.ts'
import AgentAssignButton from '@/components/dashboard/AgentAssignButton.vue'

const store = userOrderImportsStore()
const searchQuery = ref('')
const showModal = ref(false)
const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const isSubmitting = ref(false)
const error = ref<string | null>(null)

const expandedRow = ref<string | null>(null)
const loadingDetails = ref(false)
const orderImportDetails = ref<Record<string, OrderImport | null>>({})

const ordersStore = useOrdersStore()
const usersStore = useUsersStore()

function openModal() {
  showModal.value = true
  selectedFile.value = null
  error.value = null
}
function closeModal() {
  showModal.value = false
  selectedFile.value = null
  error.value = null
}
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
  } else {
    selectedFile.value = null
  }
}
async function submitFile() {
  error.value = null
  if (!selectedFile.value) {
    error.value = 'Please select a file.'
    return
  }
  isSubmitting.value = true
  try {
    await store.createOrderImport({ file: selectedFile.value })
    closeModal()
  } catch (e) {
    error.value = 'Failed to upload file.'
  } finally {
    isSubmitting.value = false
  }
}
async function toggleRow(id: string) {
  if (expandedRow.value === id) {
    expandedRow.value = null
    return
  }
  expandedRow.value = id
  if (!orderImportDetails.value[id]) {
    loadingDetails.value = true
    try {
      const details = await store.fetchOrderImportById(id)
      orderImportDetails.value = { ...orderImportDetails.value, [id]: details }
    } catch (e) {
      // error toast handled in store
    } finally {
      loadingDetails.value = false
    }
  }
}
function handleAgentAssigned(orderId: number, agentId: number, importId: string) {
  // Call the main orders store to assign the agent
  ordersStore.assignOrderToAgent(orderId, agentId).then(() => {
    // Update the local order in the expanded details
    if (orderImportDetails.value[importId]?.orders) {
      const order = orderImportDetails.value[importId].orders.find((o) => o.id === orderId)
      if (order) {
        order.agent = (usersStore.users || []).find((u) => u.id === agentId) || null
      }
    }
  })
}
function handleAgentSelected(orderId: number, agentId: number | null, importId: string) {
  if (agentId === null) {
    ordersStore.removeAgentFromOrder(orderId).then(() => {
      if (orderImportDetails.value[importId]?.orders) {
        const order = orderImportDetails.value[importId].orders.find((o) => o.id === orderId)
        if (order) order.agent = null
      }
    })
  } else {
    ordersStore.assignOrderToAgent(orderId, agentId).then(() => {
      if (orderImportDetails.value[importId]?.orders) {
        const order = orderImportDetails.value[importId].orders.find((o) => o.id === orderId)
        if (order) order.agent = (usersStore.users || []).find((u) => u.id === agentId) || null
      }
    })
  }
}
function handleImportAgentSelected(importId: string, agentId: number | null) {
  if (agentId === null) return // Optionally handle unassigning
  store.assignOrderImportAgent(importId, agentId).then((updatedImport) => {
    const imp = store.orderImports.find((i) => i.id === importId)
    if (imp) imp.agent = updatedImport.agent
  })
}
onMounted(() => {
  store.loadOrderImports()
})
const filteredImports = computed<OrderImport[]>(() => {
  return store.orderImports.filter((imp: OrderImport) => {
    if (!searchQuery.value) return true
    return (
      imp.file_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      imp.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})
</script>

<template>
  <div class="min-h-screen bg-background-secondary">
    <TopBar />
    <SideBar />
    <main class="ml-64 p-16 mt-16">
      <div class="mx-auto">
        <div class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-brand-soul to-brand-fusion bg-clip-text text-transparent">
              Prediction Lists
            </h1>
            <button @click="openModal" class="px-4 py-2 bg-gradient-to-r from-brand-soul to-brand-fusion text-white rounded-lg shadow hover:from-brand-fusion hover:to-brand-soul transition-colors">
              Add List
            </button>
          </div>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by file name or ID"
              class="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <!-- Add List Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold flex-1 text-center">Add Prediction List</h2>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-700 text-2xl ml-2 flex-shrink-0">&times;</button>
            </div>
            <form @submit.prevent="submitFile" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Select XLSX File</label>
                <input ref="fileInput" type="file" accept=".xlsx" @change="onFileChange" class="w-full border rounded px-3 py-2" />
                <div v-if="selectedFile" class="mt-2 text-sm text-gray-700">Selected: <span class="font-semibold">{{ selectedFile.name }}</span></div>
              </div>
              <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
              <div class="flex justify-end gap-2 mt-4">
                <button type="button" @click="closeModal" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button type="submit" :disabled="isSubmitting" class="px-4 py-2 rounded text-white bg-gradient-to-r from-brand-soul to-brand-fusion hover:from-brand-fusion hover:to-brand-soul disabled:opacity-50">
                  <span v-if="isSubmitting">Uploading...</span>
                  <span v-else>Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-y border-gray-200">
                <th class="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Link</th>
                <th class="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Orders Count</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-for="imp in filteredImports" :key="imp.id">
                <tr class="hover:bg-gray-50 transition-colors cursor-pointer" @click="toggleRow(imp.id)">
                  <td class="px-6 py-4">
                    <span class="text-sm font-medium text-gray-900">{{ imp.id }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="text-sm text-gray-900">{{ imp.file_name.replace(/^order_imports\//, '') }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <a :href="imp.file" target="_blank" class="text-blue-600 hover:underline" @click.stop>Download</a>
                  </td>
                  <td class="px-6 py-4">
                    <span class="text-sm font-medium text-gray-900">{{ imp.orders_count }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <AgentAssignButton :agent="imp.agent" @agent-selected="(agentId) => handleImportAgentSelected(imp.id, agentId)" />
                  </td>
                  <td class="px-2 py-4 w-10">
                    <svg
                      class="w-5 h-5 text-gray-400 transition-all inline-block"
                      :class="{ 'transform rotate-180': expandedRow === imp.id }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </td>
                </tr>
                <tr v-if="expandedRow === imp.id">
                  <td :colspan="6" class="bg-gray-50 px-6 py-4">
                    <div v-if="loadingDetails" class="flex items-center justify-center py-8">
                      <Loader2 class="w-6 h-6 animate-spin text-brand-fusion" />
                    </div>
                    <div v-else-if="orderImportDetails[imp.id]?.orders && orderImportDetails[imp.id]?.orders.length">
                      <table class="w-full text-sm border mt-2">
                        <thead>
                          <tr class="bg-gray-100">
                            <th class="w-[180px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th class="w-[300px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                            <th class="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                            <th class="w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            <th class="px-6 py-3 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <OrderRow v-for="order in orderImportDetails[imp.id]?.orders ?? []" :key="order?.id" :order="order" @agent-selected="(agentId) => handleAgentSelected(order.id, agentId, imp.id)" />
                        </tbody>
                      </table>
                    </div>
                    <div v-else class="text-gray-500 py-4 text-center">No orders found for this import.</div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template> 