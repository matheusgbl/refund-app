<template>
  <Card class="email-card">
    <template #title>
      {{ t('refund.emailPlaceholder') }}
    </template>

    <template #content>
      <Form v-slot="$form" @submit="handleSubmit" class="form-container">
        <div class="input-wrapper">
          <InputText type="email" v-model="email" class="custom-input" :style="inputStyle" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
            {{ $form.email.error?.message }}
          </Message>
        </div>

        <Button
          :label="isLoading ? t('common.loading') : t('refund.buttonPrimaryText')"
          type="submit"
          class="submit-button"
          :disabled="!isEmailValid || isLoading"
          :loading="isLoading"
        />
      </Form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { Form } from '@primevue/forms'
import Message from 'primevue/message'
import { sendVerificationEmail } from '@/utils/emailUtils'

const { t } = useI18n()

const emits = defineEmits<{
  (e: 'success'): void
}>()

const email = ref('')
const isLoading = ref(false)

const inputStyle = {
  marginBottom: '1rem',
  background: 'transparent',
  borderRadius: '8px',
  width: '100%',
  height: '48px',
  color: 'var(--primary-text-color)',
}

const emailError = computed(() => {
  if (!email.value.trim()) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value) ? '' : 'Email inválido'
})

const isEmailValid = computed(() => email.value.trim() && !emailError.value)

const handleSubmit = async () => {
  if (!isEmailValid.value) return
  isLoading.value = true

  const success = await sendVerificationEmail(email.value.trim())
  isLoading.value = false

  if (success) emits('success')
}
</script>

<style scoped src="@/assets/styles/emailRefundForm.css" />
