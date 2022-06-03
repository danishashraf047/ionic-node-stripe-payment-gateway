import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import CheckoutPage from '../views/CheckoutPage.vue'
import CancelPage from '../views/CancelPage.vue';
import SuccessPage from '../views/SuccessPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/checkout'
  },
  {
    path: '/checkout',
    name: 'CheckoutPage',
    component: CheckoutPage
  },
  {
    path: '/cancel',
    name: 'CancelPage',
    component: CancelPage
  },
  {
    path: '/success',
    name: 'SuccessPage',
    component: SuccessPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
