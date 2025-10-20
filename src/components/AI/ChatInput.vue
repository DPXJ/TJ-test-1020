<template>
  <div class="chat-input">
    <div class="chat-input__toolbar">
      <a-button type="text" size="small" title="上传文件">
        <PaperClipOutlined />
      </a-button>
      <a-button type="text" size="small" title="使用模板">
        <FileTextOutlined />
      </a-button>
      <a-button type="text" size="small" title="历史记录">
        <HistoryOutlined />
      </a-button>
    </div>
    
    <div class="chat-input__main">
      <a-textarea
        v-model:value="inputValue"
        :placeholder="placeholder"
        :auto-size="{ minRows: 1, maxRows: 5 }"
        :disabled="disabled"
        class="chat-input__textarea"
        @keydown="handleKeyDown"
      />
      
      <button 
        class="chat-input__send-btn"
        :class="{ 'chat-input__send-btn--active': canSend }"
        :disabled="!canSend || disabled"
        @click="handleSend"
      >
        <SendOutlined v-if="!loading" />
        <LoadingOutlined v-else spin />
      </button>
    </div>
    
    <div class="chat-input__hint">
      <span class="chat-input__hint-text">按 Ctrl + Enter 发送</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  PaperClipOutlined,
  FileTextOutlined,
  HistoryOutlined,
  SendOutlined,
  LoadingOutlined
} from '@ant-design/icons-vue'

interface Props {
  placeholder?: string
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  placeholder: '输入消息...',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  send: [message: string]
}>()

const inputValue = ref('')

const canSend = computed(() => {
  return inputValue.value.trim().length > 0
})

const handleSend = () => {
  if (canSend.value) {
    emit('send', inputValue.value.trim())
    inputValue.value = ''
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Ctrl + Enter 发送
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    handleSend()
  }
}

// 暴露方法供父组件调用
defineExpose({
  focus: () => {
    // 聚焦输入框
  },
  clear: () => {
    inputValue.value = ''
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.chat-input {
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: $spacing-md $spacing-lg;
  gap: $spacing-sm;
  
  &__toolbar {
    display: flex;
    gap: $spacing-xs;
  }
  
  &__main {
    display: flex;
    align-items: flex-end;
    gap: $spacing-md;
  }
  
  &__textarea {
    flex: 1;
    border: 1px solid var(--border-color);
    border-radius: $border-radius-lg;
    padding: $spacing-md;
    font-size: $font-size-md;
    resize: none;
    @include transition(border-color, box-shadow);
    
    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }
    
    :deep(textarea) {
      background: transparent !important;
      color: var(--text-primary) !important;
      
      &::placeholder {
        color: var(--text-tertiary);
      }
    }
  }
  
  &__send-btn {
    @include button-reset;
    @include flex-center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: $border-radius-round;
    background: var(--bg-tertiary);
    color: var(--text-tertiary);
    font-size: 20px;
    @include transition(all);
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    &--active:not(:disabled) {
      background: var(--primary-color);
      color: #ffffff;
      
      &:hover {
        transform: scale(1.05);
        @include shadow-md;
      }
      
      &:active {
        transform: scale(0.95);
      }
      
      [data-theme='dark'] & {
        @include gradient-bg;
        @include glow-effect;
      }
    }
  }
  
  &__hint {
    display: flex;
    justify-content: flex-end;
    
    &-text {
      font-size: $font-size-xs;
      color: var(--text-tertiary);
    }
  }
}
</style>

