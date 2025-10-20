<template>
  <div class="ai-chat-box">
    <div ref="messagesContainer" class="ai-chat-box__messages">
      <a-empty v-if="!hasMessages" description="暂无消息">
        <p class="ai-chat-box__welcome">向AI助手发送消息开始对话</p>
      </a-empty>
      
      <template v-else>
        <component
          v-for="message in messages"
          :key="message.id"
          :is="getMessageComponent(message.type)"
          :message="message"
          @action="handleMessageAction"
          @regenerate="handleRegenerate(message.id)"
          @resend="handleResend(message.id)"
          @delete="handleDelete(message.id)"
        />
      </template>
      
      <!-- AI正在输入提示 -->
      <div v-if="isAITyping" class="ai-chat-box__typing">
        <div class="ai-chat-box__typing-avatar">
          <RobotOutlined />
        </div>
        <div class="ai-chat-box__typing-bubble">
          <div class="ai-thinking">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
    
    <ChatInput 
      :disabled="isAITyping"
      :loading="isAITyping"
      @send="handleSend"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { RobotOutlined } from '@ant-design/icons-vue'
import type { MessageType } from '@/types'
import { useChatStore } from '@/stores/chat'

import AIMessage from './AIMessage.vue'
import UserMessage from './UserMessage.vue'
import ChatInput from './ChatInput.vue'

const chatStore = useChatStore()
const { messages, isAITyping, hasMessages } = storeToRefs(chatStore)

const messagesContainer = ref<HTMLElement>()

// 根据消息类型返回对应组件
const getMessageComponent = (type: MessageType) => {
  if (type === 'user') return UserMessage
  if (type === 'ai') return AIMessage
  // system消息暂时也用AI消息组件
  return AIMessage
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(() => messages.value.length, () => {
  scrollToBottom()
}, { immediate: true })

// 发送消息
const handleSend = async (content: string) => {
  await chatStore.sendMessage(content)
  scrollToBottom()
}

// 处理消息操作（卡片操作）
const handleMessageAction = (action: string, data?: any) => {
  const lastMessage = messages.value[messages.value.length - 1]
  if (lastMessage) {
    chatStore.handleCardAction(lastMessage.id, action, data)
  }
}

// 重新生成AI响应
const handleRegenerate = (messageId: string) => {
  // 找到该消息的前一条用户消息
  const messageIndex = messages.value.findIndex(m => m.id === messageId)
  if (messageIndex > 0) {
    const userMessage = messages.value[messageIndex - 1]
    if (userMessage.type === 'user') {
      chatStore.resendMessage(userMessage.id)
    }
  }
}

// 重新发送用户消息
const handleResend = (messageId: string) => {
  chatStore.resendMessage(messageId)
}

// 删除消息
const handleDelete = (messageId: string) => {
  chatStore.deleteMessage(messageId)
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.ai-chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-color);
  
  &__messages {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-lg 0;
    @include scrollbar;
  }
  
  &__welcome {
    margin-top: $spacing-md;
    color: var(--text-tertiary);
    font-size: $font-size-sm;
  }
  
  &__typing {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-lg;
    animation: slideIn $transition-normal $ease-out;
    
    &-avatar {
      @include flex-center;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: $border-radius-round;
      background: var(--primary-color);
      color: #ffffff;
      font-size: 20px;
      
      [data-theme='dark'] & {
        background: var(--accent-color);
        @include breathing;
        box-shadow: 0 0 20px var(--glow-color);
      }
    }
    
    &-bubble {
      @include flex-center;
      height: 40px;
      padding: 0 $spacing-lg;
      background: var(--ai-bubble-bg);
      border-radius: $border-radius-lg;
    }
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

