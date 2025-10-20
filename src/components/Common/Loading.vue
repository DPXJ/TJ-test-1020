<template>
  <div class="loading" :class="{ 'loading--small': size === 'small', 'loading--large': size === 'large' }">
    <div v-if="type === 'spinner'" class="loading__spinner">
      <LoadingOutlined spin />
    </div>
    
    <div v-else-if="type === 'dots'" class="loading__dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    
    <div v-else-if="type === 'pulse'" class="loading__pulse">
      <div class="pulse-ring"></div>
      <div class="pulse-dot"></div>
    </div>
    
    <p v-if="text" class="loading__text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue'

interface Props {
  type?: 'spinner' | 'dots' | 'pulse'
  size?: 'small' | 'medium' | 'large'
  text?: string
}

withDefaults(defineProps<Props>(), {
  type: 'spinner',
  size: 'medium'
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.loading {
  @include flex-column-center;
  gap: $spacing-md;
  
  &--small {
    .loading__spinner {
      font-size: 20px;
    }
    
    .loading__dots .dot {
      width: 6px;
      height: 6px;
    }
    
    .loading__pulse {
      width: 30px;
      height: 30px;
    }
  }
  
  &--large {
    .loading__spinner {
      font-size: 48px;
    }
    
    .loading__dots .dot {
      width: 12px;
      height: 12px;
    }
    
    .loading__pulse {
      width: 60px;
      height: 60px;
    }
  }
  
  &__spinner {
    font-size: 32px;
    color: var(--primary-color);
  }
  
  &__dots {
    display: flex;
    gap: $spacing-sm;
    
    .dot {
      width: 10px;
      height: 10px;
      background-color: var(--primary-color);
      border-radius: 50%;
      animation: ai-thinking 1.4s infinite;
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
  
  &__pulse {
    position: relative;
    width: 40px;
    height: 40px;
    
    .pulse-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border: 3px solid var(--primary-color);
      border-radius: 50%;
      animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
    
    .pulse-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 50%;
      background-color: var(--primary-color);
      border-radius: 50%;
      animation: pulse-dot 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
    }
  }
  
  &__text {
    margin: 0;
    color: var(--text-secondary);
    font-size: $font-size-sm;
  }
}

@keyframes pulse-ring {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.8);
  }
}
</style>

