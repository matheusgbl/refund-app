<template>
  <div class="refund-page">
    <RefundHeader />

    <div class="product-container">
      <h2>{{ t('refund.productDetails') }}</h2>
      <RefundProductDetails :product="product" />

      <h2>{{ t('refund.refundReason') }}</h2>
      <RefundReasonForm
        :reasons="refundReasons"
        v-model:selectedReason="selectedReason"
        v-model:additionalMessage="additionalMessage"
      />

      <Button
        :label="t('refund.title')"
        severity="success"
        class="submit-button"
        @click="submitRefund"
        :disabled="isSubmitDisabled"
      />
    </div>

    <RefundSuccessModal v-model:visible="showRefundModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { RefundData } from '@/models/refund.ts'
import RefundHeader from '@/components/RefundHeader.vue'
import RefundProductDetails from '@/components/RefundProductDetails.vue'
import RefundReasonForm from '@/components/RefundReasonForm.vue'
import RefundSuccessModal from '@/components/RefundSuccessModal.vue'
import Button from 'primevue/button'

const { t } = useI18n()
const router = useRouter()

const product = {
  id: '1',
  name: 'Wireless Noise-Canceling Headphones',
  price: '1x € 324.00',
  refundDeadline: '29/05/2025',
  paymentMethod: 'Mastercard 9915',
  sellerEmail: 'suporte@multidrop.com',
}

const refundReasons = [
  'refund.refundSelectFirst',
  'refund.refundSelectSecond',
  'refund.refundSelectThird',
  'refund.refundSelectFourth',
  'refund.refundSelectFifth',
  'refund.refundSelectSixth',
]

const selectedReason = ref('')
const additionalMessage = ref('')
const showRefundModal = ref(false)

const isSubmitDisabled = computed(() => selectedReason.value === '')

function submitRefund() {
  if (!selectedReason.value) return

  const refundData: RefundData = {
    productId: product.id,
    productName: product.name,
    reason: selectedReason.value,
    requestDate: new Date().toISOString(),
  }

  sessionStorage.setItem('refundData', JSON.stringify(refundData))
  showRefundModal.value = true
}

onMounted(() => {
  const userEmail = sessionStorage.getItem('userEmail')
  const userToken = sessionStorage.getItem('verificationCode')

  if (!userEmail || !userToken) {
    router.push('/')
  }
})
</script>

<style scoped src="@/assets/styles/refundPage.css" />
