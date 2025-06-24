<template>
  <Dialog
    pt:root:class="!border-0 !bg-transparent"
    pt:mask:class="backdrop-blur-sm"
    v-model:visible="localVisible"
    modal
    class="email-verification-modal"
    :style="{
      margin: '0 17px',
    }"
  >
    <template #container="{ closeCallback }">
      <Card class="verification-card">
        <template #header>
          <div class="card-header">
            <Button
              icon="pi pi-times"
              text
              rounded
              severity="secondary"
              class="close-button"
              @click="closeCallback"
            />
          </div>
        </template>

        <template #title>
          <h2 class="card-title">{{ t('refund.verifyEmail') }}</h2>
        </template>

        <template #subtitle>
          <p class="card-subtitle">
            {{ t('refund.verificationSubtitle') }}: <strong>{{ userEmail }}</strong>
          </p>
        </template>

        <template #content>
          <form @submit.prevent="handleSubmit" class="verification-form">
            <div class="resend-section">
              <Button
                text
                :label="
                  isCooldownActive
                    ? `${t('refund.resendCode')} (${resendCooldown}s)`
                    : t('refund.resendCode')
                "
                :disabled="isCooldownActive"
                @click="resendCode"
                class="p-button-sm p-button-text"
              />
            </div>

            <InputOtp
              v-model="verificationCode"
              :length="6"
              :placeholder="t('refund.codePlaceholder')"
              :class="{ 'p-invalid': codeError }"
              class="code-input"
              integerOnly
              size="large"
            />
            <small v-if="codeErrorMessage" class="p-error">{{ codeErrorMessage }}</small>

            <Button
              type="submit"
              :label="t('common.continue')"
              :loading="isLoading"
              :disabled="!isCodeValid"
              class="continue-button"
              size="large"
              icon="pi pi-arrow-right"
              iconPos="right"
            />
          </form>
        </template>
      </Card>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { validateVerificationCode } from '@/utils/validation'
import emailjs from '@emailjs/browser'
import Dialog from 'primevue/dialog'
import Card from 'primevue/card'
import InputOtp from 'primevue/inputotp'
import Button from 'primevue/button'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible'])

const { t } = useI18n()
const router = useRouter()

const userEmail = ref('')
const verificationCode = ref('')
const isLoading = ref(false)
const resendCooldown = ref(60)
const isCooldownActive = ref(true)
let cooldownInterval: number | null = null
const localVisible = ref(props.visible)
const codeErrorMessage = ref('')

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const codeError = computed(() =>
  verificationCode.value && !validateVerificationCode(verificationCode.value)
    ? t('refund.codeInvalid')
    : '',
)

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  },
)

const isCodeValid = computed(() => validateVerificationCode(verificationCode.value))

const closeModal = () => emit('update:visible', false)

const handleSubmit = async () => {
  if (!isCodeValid.value) {
    codeErrorMessage.value = t('refund.codeInvalid') // Mensagem de código incompleto ou mal formatado
    return
  }

  isLoading.value = true

  try {
    const savedCode = sessionStorage.getItem('verificationCode')
    if (savedCode === verificationCode.value) {
      codeErrorMessage.value = ''
      closeModal()
      await router.push('/purchases')
    } else {
      codeErrorMessage.value = t('refund.codeInvalid') // Mensagem de código errado
    }
  } catch (error) {
    console.error('Verification error:', error)
  } finally {
    isLoading.value = false
  }
}

const resendCode = async () => {
  if (isCooldownActive.value) return

  try {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    sessionStorage.setItem('verificationCode', newCode)

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { to_email: userEmail.value, verification_code: newCode },
      PUBLIC_KEY,
    )

    verificationCode.value = ''
    startCooldown()
  } catch (error) {
    console.error('Resend code error:', error)
  }
}

const startCooldown = () => {
  resendCooldown.value = 60
  isCooldownActive.value = true

  cooldownInterval = window.setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      isCooldownActive.value = false
      clearInterval(cooldownInterval!)
    }
  }, 1000)
}

onMounted(() => {
  const email = sessionStorage.getItem('userEmail')
  if (!email) router.push('/')
  userEmail.value = email || ''
  startCooldown()
})

onUnmounted(() => {
  if (cooldownInterval) clearInterval(cooldownInterval)
})
</script>

<style scoped src="@/assets/styles/emailVerificationModal.css" />
