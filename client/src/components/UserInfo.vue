<template>
  <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">User Information</h3>
    
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Primary Role:</span>
        <span class="text-sm text-gray-900">{{ authStore.userPrimaryRole }}</span>
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">All Roles:</span>
        <span class="text-sm text-gray-900">{{ authStore.getUserRolesString() }}</span>
      </div>
      
      <div v-if="authStore.hasMultipleRoles()" class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Multiple Roles:</span>
        <span class="text-sm text-green-600 font-medium">⭐ Yes</span>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-200">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Permission Checks:</h4>
      <div class="space-y-1 text-xs">
        <div class="flex items-center justify-between">
          <span>Can view all orders:</span>
          <span :class="authStore.can('view-all-orders') ? 'text-green-600' : 'text-red-600'">
            {{ authStore.can('view-all-orders') ? '✅' : '❌' }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>Can view assigned orders:</span>
          <span :class="authStore.can('view-assigned-orders') ? 'text-green-600' : 'text-red-600'">
            {{ authStore.can('view-assigned-orders') ? '✅' : '❌' }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>Can manage products:</span>
          <span :class="authStore.can('manage-products') ? 'text-green-600' : 'text-red-600'">
            {{ authStore.can('manage-products') ? '✅' : '❌' }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>Can manage users:</span>
          <span :class="authStore.can('manage-users') ? 'text-green-600' : 'text-red-600'">
            {{ authStore.can('manage-users') ? '✅' : '❌' }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>Can view prediction lists:</span>
          <span :class="authStore.can('view-prediction-lists') ? 'text-green-600' : 'text-red-600'">
            {{ authStore.can('view-prediction-lists') ? '✅' : '❌' }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-200">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Role Checks:</h4>
      <div class="space-y-1 text-xs">
        <div class="flex items-center justify-between">
          <span>Is Administrator:</span>
          <span :class="authStore.isAdmin() ? 'text-green-600' : 'text-red-600'">
            {{ authStore.isAdmin() ? '✅' : '❌' }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>Is Inventory Manager:</span>
          <span :class="authStore.isInventoryManager() ? 'text-green-600' : 'text-red-600'">
            {{ authStore.isInventoryManager() ? '✅' : '❌' }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>Is Agent:</span>
          <span :class="authStore.isAgent() ? 'text-green-600' : 'text-red-600'">
            {{ authStore.isAgent() ? '✅' : '❌' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script> 