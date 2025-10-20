<template>
  <div class="ai-message">
    <div class="ai-message__avatar">
      <RobotOutlined />
    </div>
    
    <div class="ai-message__content">
      <div class="ai-message__bubble">
        <!-- Markdown渲染的内容 -->
        <div 
          class="ai-message__text markdown-body" 
          v-html="renderedContent"
        />
        
        <!-- 智能卡片 -->
        <component 
          v-if="message.cardType && message.cardData"
          :is="cardComponent"
          :data="message.cardData"
          :message-id="message.id"
          @action="handleCardAction"
        />
        
        <!-- 操作按钮组 -->
        <div v-if="message.actions && message.actions.length > 0" class="ai-message__actions">
          <a-space>
            <a-button
              v-for="action in message.actions"
              :key="action.action"
              :type="action.type"
              :danger="action.type === 'danger'"
              :disabled="action.disabled"
              @click="handleActionClick(action.action)"
            >
              <component v-if="action.icon" :is="action.icon" />
              {{ action.label }}
            </a-button>
          </a-space>
        </div>
      </div>
      
      <div class="ai-message__meta">
        <span class="ai-message__time">{{ formatTime(message.timestamp) }}</span>
        <a-dropdown :trigger="['click']">
          <button class="ai-message__more">
            <EllipsisOutlined />
          </button>
          
          <template #overlay>
            <a-menu>
              <a-menu-item key="copy" @click="handleCopy">
                <CopyOutlined />
                复制
              </a-menu-item>
              <a-menu-item key="regenerate" @click="handleRegenerate">
                <RedoOutlined />
                重新生成
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  RobotOutlined,
  EllipsisOutlined,
  CopyOutlined,
  RedoOutlined
} from '@ant-design/icons-vue'
import type { Message } from '@/types'
import { formatTime } from '@/utils/format'
import { renderMarkdown } from '@/utils/markdown'
import { message as antMessage } from 'ant-design-vue'

// 智能卡片组件
import UploadCard from './Cards/UploadCard.vue'
import SelectCard from './Cards/SelectCard.vue'
import FormCard from './Cards/FormCard.vue'
import ConfirmCard from './Cards/ConfirmCard.vue'

interface Props {
  message: Message
}

const props = defineProps<Props>()

const emit = defineEmits<{
  action: [action: string, data?: any]
  regenerate: []
}>()

// 渲染Markdown内容
const renderedContent = computed(() => {
  return renderMarkdown(props.message.content)
})

// 根据卡片类型选择组件
const cardComponent = computed(() => {
  const cardMap: Record<string, any> = {
    upload: UploadCard,
    select: SelectCard,
    form: FormCard,
    confirm: ConfirmCard
  }
  return props.message.cardType ? cardMap[props.message.cardType] : null
})

// 处理卡片操作
const handleCardAction = (action: string, data?: any) => {
  emit('action', action, data)
}

// 处理操作按钮点击
const handleActionClick = (action: string) => {
  emit('action', action)
}

// 复制消息内容
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.message.content)
    antMessage.success('已复制到剪贴板')
  } catch (error) {
    antMessage.error('复制失败')
  }
}

// 重新生成
const handleRegenerate = () => {
  emit('regenerate')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.ai-message {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-lg;
  animation: slideIn $transition-normal $ease-out;
  
  &__avatar {
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
  
  &__content {
    flex: 1;
    max-width: 80%;
  }
  
  &__bubble {
    background: var(--ai-bubble-bg);
    color: var(--ai-bubble-text);
    border-radius: $border-radius-lg;
    padding: $spacing-md $spacing-lg;
    @include shadow-sm;
  }
  
  &__text {
    word-wrap: break-word;
    line-height: $line-height-relaxed;
    
    :deep(p:last-child) {
      margin-bottom: 0;
    }
  }
  
  &__actions {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid var(--border-light);
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
    
    .ai-message:hover & {
      opacity: 1;
    }
    
    &:hover {
      background: var(--hover-bg);
      color: var(--text-primary);
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

