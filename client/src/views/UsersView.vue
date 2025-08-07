<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TopBar from '../components/layout/TopBar.vue'
import SideBar from '../components/layout/SideBar.vue'
import { useUsersStore } from '@/stores/useUsersStore.ts'
import type { User } from '@/types/user.ts'
import { camelToSentenceCase, getGroupDescription } from '@/types/user-group.ts'
import type { CreateUserRequest } from '@/types/requests/create-user-request.ts'
import { Settings2Icon, Trash2Icon } from 'lucide-vue-next'

const searchQuery = ref('')
const usersStore = useUsersStore()

const showCreateModal = ref(false)
const form = ref<CreateUserRequest>({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  confirm_password: '',
  groups: [],
})
const formErrors = ref<string | null>(null)

function openCreateModal() {
  showCreateModal.value = true
  form.value = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    groups: [],
  }
  formErrors.value = null
}

function closeCreateModal() {
  showCreateModal.value = false
}

async function submitCreateUser() {
  formErrors.value = null
  if (form.value.password !== form.value.confirm_password) {
    formErrors.value = 'Passwords do not match.'
    return
  }
  try {
    await usersStore.createUserRequest(form.value)
    closeCreateModal()
  } catch (e: any) {
    formErrors.value = e?.message || 'Failed to create user.'
  }
}

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingUser = ref<User | null>(null)
const editingGroups = ref<number[]>([])
const deletingUser = ref<User | null>(null)

function openEditModal(user: User) {
  editingUser.value = user
  editingGroups.value = user.groups.map(g => g.id)
  showEditModal.value = true
}
function closeEditModal() {
  showEditModal.value = false
  editingUser.value = null
  editingGroups.value = []
}
function openDeleteModal(user: User) {
  deletingUser.value = user
  showDeleteModal.value = true
}
function closeDeleteModal() {
  showDeleteModal.value = false
  deletingUser.value = null
}
async function confirmDeleteUser() {
  if (deletingUser.value) {
    await usersStore.deleteUserById(deletingUser.value.id)
    closeDeleteModal()
  }
}

async function submitEditPermissions() {
  if (!editingUser.value) return
  try {
    await usersStore.updateUserPermissions(editingUser.value.id, editingGroups.value)
    closeEditModal()
  } catch (e) {
    // Error toast is handled in the store
  }
}

onMounted(() => {
  usersStore.loadUsers()
  usersStore.loadUserGroups()
})

const filteredUsers = computed(() => {
  return usersStore.users.filter((user: User) => {
    if (!searchQuery.value) return true
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
    return (
      fullName.includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
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
        <!-- User Groups Display -->
        <div
          v-if="usersStore.userGroups.length"
          class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6"
        >
          <h2 class="text-lg font-semibold mb-4 text-brand-fusion">User Groups</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="group in usersStore.userGroups"
              :key="group.id"
              class="p-4 border rounded-lg bg-gray-50"
            >
              <div class="font-bold text-brand-soul">{{ camelToSentenceCase(group.name) }}</div>
              <div class="text-gray-700 text-sm">{{ getGroupDescription(group) }}</div>
            </div>
          </div>
        </div>
        <div class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-brand-soul to-brand-fusion bg-clip-text text-transparent"
            >
              Users
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
              <button
                @click="openCreateModal"
                class="ml-4 px-4 py-2 bg-brand-fusion text-white rounded-lg shadow hover:bg-brand-soul transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search User"
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
        <!-- Create User Modal -->
        <div
          v-if="showCreateModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        >
          <div
            class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative max-h-screen overflow-y-auto"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold flex-1 text-center">Create User</h2>
              <button
                @click="closeCreateModal"
                class="text-gray-400 hover:text-gray-700 text-2xl ml-2 flex-shrink-0"
              >
                &times;
              </button>
            </div>
            <form @submit.prevent="submitCreateUser" class="space-y-4">
              <div class="flex flex-col gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Username</label>
                  <input
                    v-model="form.username"
                    type="text"
                    required
                    class="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">First Name</label>
                  <input
                    v-model="form.first_name"
                    type="text"
                    required
                    class="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    v-model="form.last_name"
                    type="text"
                    required
                    class="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Password</label>
                  <input
                    v-model="form.password"
                    type="password"
                    required
                    class="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    v-model="form.confirm_password"
                    type="password"
                    required
                    class="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Groups</label>
                  <div class="flex flex-col gap-2">
                    <div
                      v-for="group in usersStore.userGroups"
                      :key="group.id"
                      class="flex flex-col"
                    >
                      <label class="flex items-center gap-2">
                        <input type="checkbox" :value="group.id" v-model="form.groups" />
                        <span>{{ camelToSentenceCase(group.name) }}</span>
                      </label>
                      <span class="ml-6 text-xs text-gray-500">{{
                        getGroupDescription(group)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="formErrors" class="text-red-600 text-sm">{{ formErrors }}</div>
              <div class="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  @click="closeCreateModal"
                  class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="usersStore.creating"
                  class="px-4 py-2 rounded text-white bg-gradient-to-r from-brand-soul to-brand-fusion hover:from-brand-fusion hover:to-brand-soul disabled:opacity-50"
                >
                  <span v-if="usersStore.creating">Creating...</span>
                  <span v-else>Create</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-y border-gray-200">
                <th
                  class="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Full Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Groups
                </th>
                <th
                  class="w-[180px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Joined
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-900">{{ user.id }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-900"
                    >{{ user.first_name }} {{ user.last_name }}</span
                  >
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-900">{{ user.email }}</span>
                </td>
                <td class="px-6 py-4">
                  <span
                    v-for="group in user.groups"
                    :key="group.id"
                    class="flex items-center gap-2 text-sm text-gray-900 mb-2 last:mb-0"
                  >
                    <Settings2Icon class="w-4 h-4 text-brand-fusion" />
                    {{ camelToSentenceCase(group.name) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-900">{{
                    new Date(user.date_joined).toLocaleDateString()
                  }}</span>
                </td>
                <td class="px-6 py-4">
                  <button @click="openEditModal(user)" class="mr-3 text-brand-fusion hover:text-brand-soul">
                    <Settings2Icon class="w-5 h-5" />
                  </button>
                  <button @click="openDeleteModal(user)" class="text-red-500 hover:text-red-700">
                    <Trash2Icon class="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Edit Permissions Modal -->
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold flex-1 text-center">Edit Permissions</h2>
              <button @click="closeEditModal" class="text-gray-400 hover:text-gray-700 text-2xl ml-2 flex-shrink-0">&times;</button>
            </div>
            <form @submit.prevent="submitEditPermissions" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Groups</label>
                <div class="flex flex-col gap-2">
                  <div v-for="group in usersStore.userGroups" :key="group.id" class="flex flex-col">
                    <label class="flex items-center gap-2">
                      <input type="checkbox" :value="group.id" v-model="editingGroups" />
                      <span>{{ camelToSentenceCase(group.name) }}</span>
                    </label>
                    <span class="ml-6 text-xs text-gray-500">{{ getGroupDescription(group) }}</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-2 mt-4">
                <button type="button" @click="closeEditModal" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button type="submit" class="px-4 py-2 rounded text-white bg-gradient-to-r from-brand-soul to-brand-fusion hover:from-brand-fusion hover:to-brand-soul">Save</button>
              </div>
            </form>
          </div>
        </div>
        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold flex-1 text-center">Delete User</h2>
              <button @click="closeDeleteModal" class="text-gray-400 hover:text-gray-700 text-2xl ml-2 flex-shrink-0">&times;</button>
            </div>
            <div class="mb-4 text-gray-700">Are you sure you want to delete user <span class="font-bold">{{ deletingUser?.username }}</span>?</div>
            <div class="flex justify-end gap-2 mt-4">
              <button type="button" @click="closeDeleteModal" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button type="button" @click="confirmDeleteUser" class="px-4 py-2 rounded text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-500">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
