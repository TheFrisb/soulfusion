import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import MyPendingsView from '../views/MyPendingsView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import ProductsView from '../views/ProductsView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import { useAuthStore } from '@/stores/authStore.ts'

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
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.updateSession()
  if (!authStore.isAuthenticated() && to.name !== 'LoginView') {
    return next({ name: 'LoginView' })
  }

  next()
})

export default router
