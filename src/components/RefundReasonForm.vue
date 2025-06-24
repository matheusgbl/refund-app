<template>
  <Card class="refund-reason-card">
    <template #content>
      <div class="form-section">
        <label class="form-label">{{ t('refund.refundSelectReason') }}</label>
        <span class="required">{{ t('common.required') }}</span>
        <div class="reasons-list">
          <div v-for="(reason, index) in reasons" :key="index" class="reason-item">
            <RadioButton
              v-model="localSelectedReason"
              :inputId="'reason-' + index"
              :value="t(reason)"
            />
            <label :for="'reason-' + index" class="reason-label">{{ t(reason) }}</label>
          </div>
        </div>

        <label class="form-label optional">{{ t('refund.refundMessageOptional') }}</label>
        <Textarea v-model="localAdditionalMessage" rows="4" class="w-full" style="resize: none" />
        <span class="optional">{{ t('common.optional') }}</span>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import RadioButton from 'primevue/radiobutton'
import Textarea from 'primevue/textarea'

const { t } = useI18n()

const props = defineProps<{
  reasons: string[]
  selectedReason: string
  additionalMessage: string
}>()

const emit = defineEmits<{
  (e: 'update:selectedReason', value: string): void
  (e: 'update:additionalMessage', value: string): void
}>()

const localSelectedReason = ref(props.selectedReason)
const localAdditionalMessage = ref(props.additionalMessage)

watch(localSelectedReason, (newVal) => {
  emit('update:selectedReason', newVal)
})

watch(localAdditionalMessage, (newVal) => {
  emit('update:additionalMessage', newVal)
})

watch(
  () => props.selectedReason,
  (newVal) => {
    localSelectedReason.value = newVal
  },
)

watch(
  () => props.additionalMessage,
  (newVal) => {
    localAdditionalMessage.value = newVal
  },
)
</script>

<style scoped src="@/assets/styles/refundPage.css" />
