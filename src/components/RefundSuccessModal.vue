<template>
  <Dialog
    pt:root:class="!border-0 !bg-transparent"
    pt:mask:class="backdrop-blur-sm"
    v-model:visible="localVisible"
    modal
  >
    <template #container="{ closeCallback }">
      <div class="refund-success">
        <Card class="success-card">
          <template #content>
            <div class="success-content">
              <div class="success-icon">
                <i class="pi pi-check-circle"></i>
              </div>

              <h2 class="success-title">{{ t('refund.refundRequested') }}</h2>

              <p class="success-message">{{ t('refund.refundRequestedMessage') }}</p>
            </div>
          </template>

          <template #footer>
            <Button
              icon="pi pi-times"
              text
              rounded
              severity="secondary"
              class="close-button"
              :label="t('common.close')"
              @click="closeCallback"
            />
          </template>
        </Card>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'

const { t } = useI18n()

const props = defineProps<{ visible: boolean }>()

const localVisible = ref(props.visible)

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  },
)
</script>

<style scoped src="@/assets/styles/refundSuccessModal.css" />
