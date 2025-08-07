# Permission System Documentation

## Overview

This project implements a simple permission system based on Django user groups. Users can have multiple groups, and they get access to all permissions from all their assigned groups.

## User Groups

The system supports four user groups:

- **PredictionAgent**: Can view and manage prediction orders assigned to them
- **PendingAgent**: Can view and manage pending orders assigned to them  
- **InventoryManager**: Can manage inventory and products
- **Administrator**: Can view and manage all aspects of the application

## Permission Structure

### Route Permissions
- `/` (All Orders): Only Administrator
- `/my-pendings` (Assigned to me): PredictionAgent, PendingAgent, Administrator
- `/order/:id` (Order detail): PredictionAgent, PendingAgent, Administrator
- `/products`: InventoryManager, Administrator
- `/users`: Only Administrator
- `/prediction-lists`: InventoryManager, Administrator

### Navigation Permissions
- **All Orders**: Only Administrator
- **Assigned to me**: PredictionAgent, PendingAgent, Administrator
- **Products**: InventoryManager, Administrator
- **Users**: Only Administrator
- **Prediction Lists**: InventoryManager, Administrator

### Action Permissions
- `create-product`: InventoryManager, Administrator
- `edit-product`: InventoryManager, Administrator
- `delete-product`: InventoryManager, Administrator
- `create-user`: Administrator
- `edit-user`: Administrator
- `delete-user`: Administrator

## Usage

### In Components

```vue
<template>
  <!-- Simple permission checks -->
  <button v-if="authStore.can('create-product')" @click="addProduct">
    Add Product
  </button>
  
  <button v-if="authStore.can('edit-product')" @click="editProduct">
    Edit Product
  </button>
  
  <!-- Role checks -->
  <div v-if="authStore.isAdmin()" class="admin-panel">
    Admin Panel
  </div>
  
  <div v-if="authStore.isInventoryManager()" class="inventory-panel">
    Inventory Panel
  </div>
  
  <!-- Show user info -->
  <div class="user-info">
    <p>Primary Role: {{ authStore.userPrimaryRole }}</p>
    <p>All Roles: {{ authStore.getUserRolesString() }}</p>
    <p v-if="authStore.hasMultipleRoles()">⭐ User has multiple roles</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>
```

### Available Methods

#### Permission Checks
```typescript
authStore.can('create-product')     // true/false
authStore.can('edit-product')      // true/false
authStore.can('manage-users')      // true/false
authStore.can('view-all-orders')   // true/false
authStore.can('view-assigned-orders') // true/false
authStore.can('manage-products')   // true/false
authStore.can('view-prediction-lists') // true/false
```

#### Role Checks
```typescript
authStore.isAdmin()                // true/false
authStore.isInventoryManager()     // true/false
authStore.isAgent()                // true/false (PredictionAgent or PendingAgent)
authStore.isPredictionAgent()      // true/false
authStore.isPendingAgent()         // true/false
```

#### User Information
```typescript
authStore.userPrimaryRole          // "Administrator", "Inventory Manager", etc.
authStore.userRoles                // Array of all user's roles
authStore.getUserRolesString()     // "PredictionAgent, InventoryManager"
authStore.hasMultipleRoles()       // true/false
```

## Multiple Group Support

Users can belong to multiple groups. For example:

```typescript
// User with both PredictionAgent and InventoryManager groups
const user = {
  groups: [
    { name: 'PredictionAgent' },
    { name: 'InventoryManager' }
  ]
}

// This user can:
authStore.can('view-assigned-orders')     // true (from PredictionAgent)
authStore.can('manage-products')          // true (from InventoryManager)
authStore.can('create-product')           // true (from InventoryManager)
authStore.can('view-prediction-lists')    // true (from InventoryManager)
```

## Administrator Override

Users with the `Administrator` group have access to everything, regardless of other groups.

## File Structure

```
src/
├── utils/
│   └── permissions.ts          # Core permission logic
├── stores/
│   └── authStore.ts           # Auth store with permission methods
├── router/
│   └── index.js               # Route protection logic
└── components/
    ├── layout/
    │   └── SideBar.vue        # Navigation with permission filtering
    └── UserInfo.vue           # Example component showing permissions
```

## Adding New Permissions

1. Add the permission to the `can()` method in `authStore.ts`:
```typescript
function can(permission: string): boolean {
  const permissions = {
    // ... existing permissions
    'new-permission': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
  }
  // ... rest of method
}
```

2. Use it in components:
```vue
<button v-if="authStore.can('new-permission')" @click="doSomething">
  Do Something
</button>
```

## Adding New Routes

1. Add route permission to `router/index.js`:
```javascript
const ROUTE_PERMISSIONS = {
  // ... existing routes
  '/new-route': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
}
```

2. Add navigation permission to `authStore.ts`:
```typescript
function canSeeNav(navItem: string): boolean {
  const navPermissions = {
    // ... existing nav items
    'New Feature': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
  }
  // ... rest of method
}
``` 