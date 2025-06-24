<template>
  <Card class="product-details-card">
    <template #content>
      <p>
        <strong>{{ t('refund.productName') }}</strong> <br />{{ product.name }}
      </p>
      <p>
        <strong>{{ t('refund.productValue') }}</strong> <br />{{ product.price }}
      </p>
      <p>
        <strong>{{ t('refund.productLimitDate') }}</strong> <br />{{ product.refundDeadline }}
      </p>
      <p>
        <strong>{{ t('refund.productPaymentMethod') }}</strong> <br />{{ product.paymentMethod }}
      </p>
      <p>
        <strong>{{ t('refund.productSupportMail') }}</strong> <br />{{ product.sellerEmail }}
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'

const { t } = useI18n()

defineProps<{
  product: {
    name: string
    price: string
    refundDeadline: string
    paymentMethod: string
    sellerEmail: string
  }
}>()
</script>

<style scoped src="@/assets/styles/refundPage.css" />
