import type { User } from '@/types/user'

// Simple permission groups
export const ROLES = {
  PREDICTION_AGENT: 'PredictionAgent',
  PENDING_AGENT: 'PendingAgent', 
  INVENTORY_MANAGER: 'InventoryManager',
  ADMINISTRATOR: 'Administrator',
} as const

// Simple permission checker that handles multiple groups
export function hasPermission(user: User | null, requiredRoles: string[]): boolean {
  if (!user?.groups) return false
  
  const userRoles = user.groups.map(group => group.name)
  
  // Administrator has access to everything
  if (userRoles.includes(ROLES.ADMINISTRATOR)) return true
  
  // Check if user has ANY of the required roles (from any of their groups)
  return requiredRoles.some(role => userRoles.includes(role))
}

// Get all user's roles
export function getUserRoles(user: User | null): string[] {
  if (!user?.groups) return []
  return user.groups.map(group => group.name)
}

// Get user's primary role (highest privilege)
export function getUserPrimaryRole(user: User | null): string {
  if (!user?.groups) return 'User'
  
  const userRoles = user.groups.map(group => group.name)
  
  if (userRoles.includes(ROLES.ADMINISTRATOR)) return 'Administrator'
  if (userRoles.includes(ROLES.INVENTORY_MANAGER)) return 'Inventory Manager'
  if (userRoles.includes(ROLES.PREDICTION_AGENT)) return 'Prediction Agent'
  if (userRoles.includes(ROLES.PENDING_AGENT)) return 'Pending Agent'
  
  return 'User'
}

// Check if user has any of the specified roles
export function hasAnyRole(user: User | null, roles: string[]): boolean {
  if (!user?.groups) return false
  
  const userRoles = user.groups.map(group => group.name)
  return roles.some(role => userRoles.includes(role))
} 