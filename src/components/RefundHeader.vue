<template>
  <div class="header-section">
    <Button
      icon="pi pi-arrow-left"
      text
      @click="goBack"
      :label="t('common.back')"
      class="back-button"
    />
    <div class="header-content">
      <h1>{{ t('refund.requestRefund') }}</h1>
      <div class="user-info">
        <span>{{ t('refund.loggedAs') }}: {{ userEmail }}. {{ t('refund.itsNotYou') }}</span>
        <Button label="Logout" text @click="logout" class="logout-button" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'

const { t } = useI18n()
const router = useRouter()
const userEmail = sessionStorage.getItem('userEmail')

function goBack() {
  router.push('/purchases')
}

function logout() {
  sessionStorage.clear()
  router.push('/')
}
</script>

<style scoped src="@/assets/styles/refundPage.css" />
