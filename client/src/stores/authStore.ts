import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { User } from '@/types/user.ts'
import { getMe } from '@/http/auth'
import { hasPermission, getUserRoles, getUserPrimaryRole, hasAnyRole, ROLES } from '@/utils/permissions'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)

  // Computed properties
  const userRoles = computed(() => getUserRoles(user.value))
  const userPrimaryRole = computed(() => getUserPrimaryRole(user.value))

  async function updateSession() {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
      clearUser()
      return false
    }

    try {
      const data = await getMe()
      setUser(data)
      console.log(`update session: ${data}`)
    } catch (error) {
      console.log(error)
    }
  }

  function isAuthenticated() {
    return user.value !== null
  }

  function clearUser() {
    user.value = null
  }

  function setUser(data: User) {
    user.value = data
  }

  function logoutUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    clearUser()
  }

  // Simple permission API
  function can(permission: string): boolean {
    const permissions = {
      // Route permissions
      'view-all-orders': [ROLES.ADMINISTRATOR],
      'view-assigned-orders': [ROLES.PREDICTION_AGENT, ROLES.PENDING_AGENT, ROLES.ADMINISTRATOR],
      'manage-products': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
      'manage-users': [ROLES.ADMINISTRATOR],
      'view-prediction-lists': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
      
      // Action permissions
      'create-product': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
      'edit-product': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
      'delete-product': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
      'create-user': [ROLES.ADMINISTRATOR],
      'edit-user': [ROLES.ADMINISTRATOR],
      'delete-user': [ROLES.ADMINISTRATOR],
    }

    const requiredRoles = permissions[permission as keyof typeof permissions]
    if (!requiredRoles) return false
    
    return hasPermission(user.value, requiredRoles)
  }

  // Navigation visibility checker
  function canSeeNav(navItem: string): boolean {
    const navPermissions = {
      'All Orders': [ROLES.ADMINISTRATOR],
      'Assigned to me': [ROLES.PREDICTION_AGENT, ROLES.PENDING_AGENT, ROLES.ADMINISTRATOR],
      'Products': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
      'Users': [ROLES.ADMINISTRATOR],
      'Prediction Lists': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
    }

    const requiredRoles = navPermissions[navItem as keyof typeof navPermissions]
    if (!requiredRoles) return true
    return hasPermission(user.value, requiredRoles)
  }

  // Role checks that handle multiple groups
  function isAdmin(): boolean {
    return userRoles.value.includes(ROLES.ADMINISTRATOR)
  }

  function isInventoryManager(): boolean {
    return userRoles.value.includes(ROLES.INVENTORY_MANAGER)
  }

  function isAgent(): boolean {
    return hasAnyRole(user.value, [ROLES.PREDICTION_AGENT, ROLES.PENDING_AGENT])
  }

  function isPredictionAgent(): boolean {
    return userRoles.value.includes(ROLES.PREDICTION_AGENT)
  }

  function isPendingAgent(): boolean {
    return userRoles.value.includes(ROLES.PENDING_AGENT)
  }

  // Check if user has multiple roles
  function hasMultipleRoles(): boolean {
    return userRoles.value.length > 1
  }

  // Get all user's roles as a string
  function getUserRolesString(): string {
    return userRoles.value.join(', ')
  }

  return {
    user,
    userRoles,
    userPrimaryRole,
    isAuthenticated,
    clearUser,
    setUser,
    updateSession,
    logoutUser,
    // Simple permission API
    can,
    canSeeNav,
    isAdmin,
    isInventoryManager,
    isAgent,
    isPredictionAgent,
    isPendingAgent,
    hasMultipleRoles,
    getUserRolesString,
  }
})
