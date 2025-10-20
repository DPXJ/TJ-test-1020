<template>
  <div class="user-message">
    <div class="user-message__content">
      <div class="user-message__bubble">
        <p class="user-message__text">{{ message.content }}</p>
      </div>
      
      <div class="user-message__meta">
        <a-dropdown :trigger="['click']">
          <button class="user-message__more">
            <EllipsisOutlined />
          </button>
          
          <template #overlay>
            <a-menu>
              <a-menu-item key="copy" @click="handleCopy">
                <CopyOutlined />
                复制
              </a-menu-item>
              <a-menu-item key="resend" @click="handleResend">
                <RedoOutlined />
                重新发送
              </a-menu-item>
              <a-menu-item key="delete" danger @click="handleDelete">
                <DeleteOutlined />
                删除
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <span class="user-message__time">{{ formatTime(message.timestamp) }}</span>
      </div>
    </div>
    
    <div class="user-message__avatar">
      <a-avatar :src="userAvatar" :size="40">
        {{ userName.charAt(0) }}
      </a-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EllipsisOutlined,
  CopyOutlined,
  RedoOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import type { Message } from '@/types'
import { formatTime } from '@/utils/format'
import { useUserStore } from '@/stores/user'
import { message as antMessage, Modal } from 'ant-design-vue'

interface Props {
  message: Message
}

const props = defineProps<Props>()

const emit = defineEmits<{
  resend: []
  delete: []
}>()

const userStore = useUserStore()
const { userName, userAvatar } = storeToRefs(userStore)

// 复制消息内容
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.message.content)
    antMessage.success('已复制到剪贴板')
  } catch (error) {
    antMessage.error('复制失败')
  }
}

// 重新发送
const handleResend = () => {
  emit('resend')
}

// 删除消息
const handleDelete = () => {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除这条消息吗？',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      emit('delete')
    }
  })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.user-message {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-md;
  padding: $spacing-lg;
  animation: slideIn $transition-normal $ease-out;
  
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 70%;
  }
  
  &__bubble {
    background: var(--user-bubble-bg);
    color: var(--user-bubble-text);
    border-radius: $border-radius-lg;
    padding: $spacing-md $spacing-lg;
    @include shadow-sm;
  }
  
  &__text {
    margin: 0;
    word-wrap: break-word;
    line-height: $line-height-relaxed;
  }
  
  &__meta {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-top: $spacing-sm;
    padding: 0 $spacing-sm;
  }
  
  &__time {
    font-size: $font-size-xs;
    color: var(--text-tertiary);
  }
  
  &__more {
    @include button-reset;
    @include flex-center;
    width: 24px;
    height: 24px;
    font-size: 14px;
    color: var(--text-tertiary);
    border-radius: $border-radius-sm;
    opacity: 0;
    @include transition(all);
    
    .user-message:hover & {
      opacity: 1;
    }
    
    &:hover {
      background: var(--hover-bg);
      color: var(--text-primary);
    }
  }
  
  &__avatar {
    flex-shrink: 0;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

