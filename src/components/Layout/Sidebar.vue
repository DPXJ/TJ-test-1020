<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
    <div class="sidebar__header">
      <h3 class="sidebar__title">历史对话</h3>
      <button class="sidebar__close-btn" @click="emit('close')">
        <CloseOutlined />
      </button>
    </div>
    
    <div class="sidebar__content">
      <a-empty v-if="chatHistories.length === 0" description="暂无历史对话">
        <a-button type="primary" @click="emit('new-chat')">
          开始新对话
        </a-button>
      </a-empty>
      
      <div v-else class="sidebar__list">
        <div
          v-for="chat in chatHistories"
          :key="chat.id"
          class="sidebar__item"
          :class="{ 'sidebar__item--active': chat.id === currentChatId }"
          @click="handleSelectChat(chat.id)"
        >
          <div class="sidebar__item-content">
            <MessageOutlined class="sidebar__item-icon" />
            <div class="sidebar__item-text">
              <p class="sidebar__item-title">{{ chat.title }}</p>
              <p class="sidebar__item-time">{{ formatTime(chat.updatedAt) }}</p>
            </div>
          </div>
          
          <a-dropdown :trigger="['click']" placement="bottomRight">
            <button class="sidebar__item-more" @click.stop>
              <EllipsisOutlined />
            </button>
            
            <template #overlay>
              <a-menu>
                <a-menu-item key="delete" @click="handleDeleteChat(chat.id)">
                  <DeleteOutlined />
                  删除
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    
    <div class="sidebar__footer">
      <a-button block type="dashed" @click="emit('new-chat')">
        <template #icon>
          <PlusOutlined />
        </template>
        新建对话
      </a-button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { 
  CloseOutlined, 
  MessageOutlined, 
  EllipsisOutlined, 
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import { useChatStore } from '@/stores/chat'
import { formatTime } from '@/utils/format'
import { Modal, message } from 'ant-design-vue'

interface Props {
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false
})

const emit = defineEmits<{
  'close': []
  'new-chat': []
}>()

const chatStore = useChatStore()
const { chatHistories, currentChatId } = storeToRefs(chatStore)

const handleSelectChat = (chatId: string) => {
  chatStore.loadChat(chatId)
  emit('close')
}

const handleDeleteChat = (chatId: string) => {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除这个对话吗？删除后无法恢复。',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      chatStore.deleteChatHistory(chatId)
      message.success('对话已删除')
    }
  })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.sidebar {
  display: flex;
  flex-direction: column;
  width: $sidebar-width;
  height: 100%;
  background: var(--bg-color);
  border-right: 1px solid var(--border-color);
  @include transition(transform);
  
  @include mobile {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-fixed;
    transform: translateX(-100%);
    
    &:not(.sidebar--collapsed) {
      transform: translateX(0);
      box-shadow: var(--shadow-lg);
    }
  }
  
  &__header {
    @include flex-between;
    padding: $spacing-lg;
    border-bottom: 1px solid var(--border-color);
  }
  
  &__title {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: var(--text-primary);
  }
  
  &__close-btn {
    @include button-reset;
    @include flex-center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    color: var(--text-secondary);
    border-radius: $border-radius-md;
    @include transition(all);
    
    &:hover {
      background: var(--hover-bg);
      color: var(--text-primary);
    }
    
    @include desktop {
      display: none;
    }
  }
  
  &__content {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-md;
    @include scrollbar;
  }
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }
  
  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md;
    border-radius: $border-radius-md;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      background: var(--hover-bg);
      
      .sidebar__item-more {
        opacity: 1;
      }
    }
    
    &--active {
      background: var(--active-bg);
      
      .sidebar__item-title {
        color: var(--primary-color);
        font-weight: $font-weight-medium;
      }
    }
    
    &-content {
      flex: 1;
      display: flex;
      align-items: flex-start;
      gap: $spacing-sm;
      overflow: hidden;
    }
    
    &-icon {
      flex-shrink: 0;
      font-size: 18px;
      color: var(--text-secondary);
      margin-top: 2px;
    }
    
    &-text {
      flex: 1;
      overflow: hidden;
    }
    
    &-title {
      margin: 0 0 4px 0;
      font-size: $font-size-sm;
      color: var(--text-primary);
      @include text-ellipsis;
    }
    
    &-time {
      margin: 0;
      font-size: $font-size-xs;
      color: var(--text-tertiary);
    }
    
    &-more {
      @include button-reset;
      @include flex-center;
      width: 24px;
      height: 24px;
      font-size: 16px;
      color: var(--text-secondary);
      border-radius: $border-radius-sm;
      opacity: 0;
      @include transition(all);
      
      &:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }
    }
  }
  
  &__footer {
    padding: $spacing-lg;
    border-top: 1px solid var(--border-color);
  }
}
</style>

