import { jsonHttp } from '@/http/http.js'
import { User } from '@/types/user.ts'
import { UserGroup } from '@/types/user-group.ts'
import { CreateUserRequest } from '@/types/requests/create-user-request.ts'

/**
 * Fetches a list of all users from the API
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects
 * @throws {Error} If the API request fails
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await jsonHttp.get('/api/accounts/users/')
    // Ensure response.data is an array, return empty array if not
    return Array.isArray(response.data) ? (response.data as User[]) : []
  } catch (error: any) {
    // Throw the error response data or a default error message
    throw error.response?.data || new Error('Failed to fetch users')
  }
}

/**
 * Queries users from the API with a search query
 * @param {string} query - Search query string to filter users
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects
 * @throws {Error} If the API request fails
 */
export const queryUsers = async (query: string): Promise<User[]> => {
  try {
    const response = await jsonHttp.get('/api/accounts/users/', {
      params: { search: query }, // Convert string query to a params object
    })
    // Ensure response.data is an array, return empty array if not
    return Array.isArray(response.data) ? (response.data as User[]) : []
  } catch (error: any) {
    // Throw the error response data or a default error message
    throw error.response?.data || new Error('Failed to query users')
  }
}

export const createUser = async (createUserRequest: CreateUserRequest): Promise<User> => {
  try {
    const response = await jsonHttp.post('/api/accounts/users/create/', createUserRequest)
    return response.data as User
  } catch (error: any) {
    // Throw the error response data or a default error message
    throw error.response?.data || new Error('Failed to create user')
  }
}

export const updateUserGroups = async (userId: number, groups: number[]): Promise<User> => {
  try {
    const response = await jsonHttp.patch(`/api/accounts/users/${userId}/groups/`, {
      groups: groups,
    })
    return response.data as User
  } catch (error: any) {
    throw error.response?.data || new Error('Failed to update user permissions')
  }
}

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await jsonHttp.delete(`/api/accounts/users/${userId}/`)
  } catch (error: any) {
    throw error.response?.data || new Error('Failed to delete user')
  }
}

export const fetchUserGroups = async (): Promise<UserGroup[]> => {
  try {
    const response = await jsonHttp.get('/api/accounts/groups/')
    return response.data as UserGroup[]
  } catch (error: any) {
    throw error.response?.data || new Error('Failed to fetch user groups')
  }
}
