import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import {
  createUser,
  deleteUser as apiDeleteUser,
  fetchUserGroups,
  fetchUsers,
  updateUserGroups as apiUpdateUserPermissions,
} from '@/http/users.ts'
import type { User } from '@/types/user.ts'
import type { UserGroup } from '@/types/user-group.ts'
import type { CreateUserRequest } from '@/types/requests/create-user-request.ts'

export const useUsersStore = defineStore('usersStore', () => {
  const toast = useToast()

  // Robust: always initialize as empty array, type-safe
  const users = ref<User[]>([])
  const userGroups = ref<UserGroup[]>([])
  const loading = ref(false)
  const loadingGroups = ref(false)
  const creating = ref(false)

  async function loadUsers() {
    loading.value = true
    try {
      const response = await fetchUsers()
      users.value = response as User[]
    } catch (error) {
      console.error(error)
      toast.error('Error loading users')
    } finally {
      loading.value = false
    }
  }

  async function loadUserGroups() {
    loadingGroups.value = true
    try {
      const response = await fetchUserGroups()
      userGroups.value = response as UserGroup[]
    } catch (error) {
      console.error(error)
      toast.error('Error loading user groups')
    } finally {
      loadingGroups.value = false
    }
  }

  async function createUserRequest(payload: CreateUserRequest) {
    creating.value = true
    try {
      const newUser = await createUser(payload)
      users.value.push(newUser)
      toast.success('User created successfully')
      return newUser
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || 'Failed to create user')
      throw error
    } finally {
      creating.value = false
    }
  }

  async function deleteUserById(userId: number) {
    try {
      await apiDeleteUser(userId)
      users.value = users.value.filter((u) => u.id !== userId)
      toast.success('User deleted successfully')
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || 'Failed to delete user')
      throw error
    }
  }

  async function updateUserPermissions(userId: number, groups: number[]) {
    try {
      const updatedUser = await apiUpdateUserPermissions(userId, groups)
      // Update the user in the users list
      const idx = users.value.findIndex((u) => u.id === userId)
      if (idx !== -1) users.value[idx] = updatedUser
      toast.success('User permissions updated successfully')
      return updatedUser
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || 'Failed to update user permissions')
      throw error
    }
  }

  return {
    users,
    userGroups,
    loading,
    loadingGroups,
    creating,
    loadUsers,
    loadUserGroups,
    createUserRequest,
    deleteUserById,
    updateUserPermissions,
  }
})
