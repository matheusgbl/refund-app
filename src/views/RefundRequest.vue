<template>
  <div class="refund-request">
    <div class="text-container">
      <h1 class="refund-title">{{ t('refund.title') }}</h1>
      <p class="subtitle">{{ t('refund.subtitle') }}</p>
    </div>

    <RefundEmailForm @success="openModal" />

    <EmailVerificationModal v-model:visible="showVerificationModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import RefundEmailForm from '@/components/RefundEmailForm.vue'
import EmailVerificationModal from '@/components/EmailVerificationModal.vue'

const { t } = useI18n()
const showVerificationModal = ref(false)

function openModal() {
  showVerificationModal.value = true
}
</script>

<style scoped src="@/assets/styles/refundRequest.css" />
