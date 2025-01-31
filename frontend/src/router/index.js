import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import MyPendingsView from '../views/MyPendingsView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import ProductsView from '../views/ProductsView.vue'
import LoginView from '../views/LoginView.vue'

// Navigation guard
function requireAuth(to, from, next) {
  if (!localStorage.getItem('isAuthenticated')) {
    next('/login')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: DashboardView,
      beforeEnter: requireAuth,
    },
    {
      path: '/my-pendings',
      name: 'my-pendings',
      component: MyPendingsView,
      beforeEnter: requireAuth,
    },
    {
      path: '/order/:id',
      name: 'order-detail',
      component: OrderDetailView,
      beforeEnter: requireAuth,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router
