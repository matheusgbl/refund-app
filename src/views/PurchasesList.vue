<template>
  <div class="purchase-history-container">
    <!-- Header -->
    <div class="header-section">
      <Button
        icon="pi pi-arrow-left"
        text
        @click="goBack"
        :label="t('common.back')"
        class="back-button"
      />

      <div class="header-content">
        <h1 class="page-title">{{ t('refund.yourPurchases') }}</h1>
        <div class="user-info">
          <span>{{ t('refund.loggedAs') }}: {{ userEmail }}. {{ t('refund.itsNotYou') }}</span>
          <Button label="Logout" text @click="logout" class="logout-button" />
        </div>
      </div>
    </div>

    <!-- Info Message -->
    <Message severity="info" class="info-message">
      <template #icon><i class="pi pi-info-circle"></i></template>
      {{ t('refund.refundMessage') }}
    </Message>

    <!-- Purchase List -->
    <div class="purchase-list">
      <PurchaseItem
        v-for="purchase in purchases"
        :key="purchase.id"
        :purchase="purchase"
        @request-refund="handleRefund"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Message from 'primevue/message'
import PurchaseItem from '@/components/PurchaseItem.vue'

const { t } = useI18n()
const router = useRouter()
const userEmail = sessionStorage.getItem('userEmail')

type Purchase = {
  id: number
  name: string
  price: string
  purchaseDate: string
  refundDeadline: string
  image: string
  status: 'active' | 'refunded' | 'waiting'
}

const purchases = ref<Purchase[]>([
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    price: '€ 324,00',
    purchaseDate: '22/05/2025',
    refundDeadline: '29/05/2025',
    image: '/bluetoothheadphones.webp',
    status: 'active',
  },
  {
    id: 2,
    name: 'Wireless Noise-Canceling Headphones',
    price: '€ 324,00',
    purchaseDate: '22/05/2025',
    refundDeadline: '29/05/2025',
    image: '/bluetoothheadphones.webp',
    status: 'waiting',
  },
  {
    id: 3,
    name: 'Wireless Noise-Canceling Headphones',
    price: '€ 324,00',
    purchaseDate: '22/05/2025',
    refundDeadline: '29/05/2025',
    image: '/bluetoothheadphones.webp',
    status: 'refunded',
  },
])

function goBack() {
  router.push('/')
}

function logout() {
  sessionStorage.clear()
  router.push('/')
}

function handleRefund(purchaseId: number) {
  router.push(`/product/${purchaseId}`)
}

onMounted(() => {
  const userEmail = sessionStorage.getItem('userEmail')
  const userToken = sessionStorage.getItem('verificationCode')

  if (!userEmail || !userToken) {
    router.push('/')
  }
})
</script>

<style scoped src="@/assets/styles/purchaseHistory.css" />
