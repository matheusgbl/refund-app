<template>
  <Card :class="['purchase-item', { refunded: purchase.status === 'refunded' }]">
    <template #content>
      <div class="purchase-content">
        <img :src="purchase.image" :alt="purchase.name" class="product-image" />

        <div class="product-details">
          <h3>{{ purchase.name }}</h3>
          <p>
            <strong>{{ t('product.price') }}:</strong> {{ purchase.price }}
          </p>
          <p>
            <strong>{{ t('product.purchaseDate') }}:</strong> {{ purchase.purchaseDate }}
          </p>
          <p>
            <strong>{{ t('product.refundLimit') }}:</strong> {{ purchase.refundDeadline }}
          </p>
        </div>

        <div class="action-section">
          <Button
            v-if="purchase.status === 'active'"
            :label="t('product.active')"
            class="p-button active"
            @click="onRequestRefund"
          />
          <div v-else-if="purchase.status === 'waiting'" class="badge waiting">
            <i class="pi pi-clock"></i>
            <span>{{ t('product.waiting') }}</span>
          </div>
          <div v-else class="badge refunded">
            <i class="pi pi-user"></i>
            <span>{{ t('product.refunded') }}</span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Button from 'primevue/button'

const { t } = useI18n()

interface Purchase {
  id: number
  name: string
  price: string
  purchaseDate: string
  refundDeadline: string
  image: string
  status: 'active' | 'refunded' | 'waiting'
}

const props = defineProps<{
  purchase: Purchase
}>()

const emit = defineEmits<{
  (e: 'request-refund', id: number): void
}>()

function onRequestRefund() {
  emit('request-refund', props.purchase.id)
}
</script>

<style scoped src="@/assets/styles/purchaseItem.css" />
