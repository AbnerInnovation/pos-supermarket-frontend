import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/pos',
    name: 'POS',
    component: () => import('@/views/POSView.vue')
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('@/views/InventoryView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
