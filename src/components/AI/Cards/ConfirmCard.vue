<template>
  <div class="confirm-card" :class="{ 'confirm-card--danger': data.danger }">
    <div class="confirm-card__content">
      <h4 class="confirm-card__title">{{ data.title }}</h4>
      <p class="confirm-card__description">{{ data.description }}</p>
    </div>
    
    <div class="confirm-card__actions">
      <a-button @click="handleCancel">
        {{ data.cancelText || '取消' }}
      </a-button>
      <a-button 
        type="primary" 
        :danger="data.danger"
        @click="handleConfirm"
      >
        {{ data.confirmText || '确认' }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConfirmCardData } from '@/types'

interface Props {
  data: ConfirmCardData
  messageId: string
}

defineProps<Props>()

const emit = defineEmits<{
  action: [action: string, data?: any]
}>()

const handleConfirm = () => {
  emit('action', 'confirmed')
}

const handleCancel = () => {
  emit('action', 'cancelled')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.confirm-card {
  margin-top: $spacing-md;
  padding: $spacing-lg;
  background: var(--info-color);
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.1) 0%, rgba(24, 144, 255, 0.05) 100%);
  border: 1px solid var(--info-color);
  border-radius: $border-radius-md;
  
  &--danger {
    background: linear-gradient(135deg, rgba(255, 77, 79, 0.1) 0%, rgba(255, 77, 79, 0.05) 100%);
    border-color: var(--error-color);
    
    .confirm-card__title {
      color: var(--error-color);
    }
  }
  
  &__content {
    margin-bottom: $spacing-lg;
  }
  
  &__title {
    margin: 0 0 $spacing-sm 0;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: var(--info-color);
  }
  
  &__description {
    margin: 0;
    font-size: $font-size-md;
    color: var(--text-primary);
    line-height: $line-height-relaxed;
    white-space: pre-wrap;
  }
  
  &__actions {
    display: flex;
    gap: $spacing-md;
    justify-content: flex-end;
  }
}
</style>

