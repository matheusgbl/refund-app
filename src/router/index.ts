import { createRouter, createWebHistory } from 'vue-router'
import RefundRequest from '../views/RefundRequest.vue'
import PurchasesList from '../views/PurchasesList.vue'
import ProductDetails from '../views/ProductDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'refund-request',
      component: RefundRequest,
    },
    {
      path: '/purchases',
      name: 'purchases-list',
      component: PurchasesList,
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: ProductDetails,
      props: true,
    },
  ],
})

export default router
