import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import MyPendingsView from '../views/MyPendingsView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import ProductsView from '../views/ProductsView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import PredictionListView from '../views/PredictionListView.vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { ROLES } from '@/utils/permissions'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: DashboardView,
    },
    {
      path: '/my-pendings',
      name: 'my-pendings',
      component: MyPendingsView,
    },
    {
      path: '/order/:id',
      name: 'order-detail',
      component: OrderDetailView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/prediction-lists',
      name: 'prediction-lists',
      component: PredictionListView,
    },
  ],
})

// Route permission mapping
const ROUTE_PERMISSIONS = {
  '/': [ROLES.ADMINISTRATOR],
  '/my-pendings': [ROLES.PREDICTION_AGENT, ROLES.PENDING_AGENT, ROLES.ADMINISTRATOR],
  '/order/:id': [ROLES.PREDICTION_AGENT, ROLES.PENDING_AGENT, ROLES.ADMINISTRATOR],
  '/products': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
  '/users': [ROLES.ADMINISTRATOR],
  '/prediction-lists': [ROLES.INVENTORY_MANAGER, ROLES.ADMINISTRATOR],
}

// Permission checker function that handles multiple groups
function hasRoutePermission(user, route) {
  if (!user?.groups) return false
  
  const userRoles = user.groups.map(group => group.name)
  
  // Administrator has access to everything
  if (userRoles.includes(ROLES.ADMINISTRATOR)) return true
  
  // Get required roles for this route
  const requiredRoles = ROUTE_PERMISSIONS[route]
  if (!requiredRoles) return true // If no permissions defined, allow access
  
  // Check if user has ANY of the required roles (from any of their groups)
  return requiredRoles.some(role => userRoles.includes(role))
}

// Check if user can view assigned orders (from any group)
function canViewAssignedOrders(user) {
  if (!user?.groups) return false
  
  const userRoles = user.groups.map(group => group.name)
  const allowedRoles = [ROLES.PREDICTION_AGENT, ROLES.PENDING_AGENT, ROLES.ADMINISTRATOR]
  
  return allowedRoles.some(role => userRoles.includes(role))
}

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.updateSession()
  
  // If user is not authenticated and trying to access a protected route
  if (!authStore.isAuthenticated() && to.name !== 'LoginView') {
    return next({ name: 'LoginView' })
  }

  // If user is authenticated but trying to access login page, redirect to appropriate page
  if (authStore.isAuthenticated() && to.name === 'LoginView') {
    // Find the first route the user has permission for
    if (hasRoutePermission(authStore.user, '/')) {
      return next({ name: 'orders' })
    } else if (canViewAssignedOrders(authStore.user)) {
      return next({ name: 'my-pendings' })
    } else {
      // User has no permissions, stay on login
      return next()
    }
  }

  // Check route permissions for authenticated users
  if (authStore.isAuthenticated() && !hasRoutePermission(authStore.user, to.path)) {
    // Find the first route the user has permission for
    if (hasRoutePermission(authStore.user, '/')) {
      return next({ name: 'orders' })
    } else if (canViewAssignedOrders(authStore.user)) {
      return next({ name: 'my-pendings' })
    } else {
      // User has no permissions at all, redirect to login
      return next({ name: 'LoginView' })
    }
  }

  next()
})

export default router
