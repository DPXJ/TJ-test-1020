<template>
  <div class="history-view">
    <div class="history-view__header">
      <h2>历史记录</h2>
    </div>
    
    <div class="history-view__content">
      <a-empty v-if="chatHistories.length === 0" description="暂无历史记录" />
      
      <div v-else class="history-view__list">
        <div
          v-for="chat in chatHistories"
          :key="chat.id"
          class="history-view__item"
          @click="handleSelectChat(chat.id)"
        >
          <div class="history-view__item-content">
            <h3>{{ chat.title }}</h3>
            <p>{{ chat.messages.length }} 条消息</p>
            <p>{{ formatTime(chat.updatedAt) }}</p>
          </div>
          
          <a-button danger @click.stop="handleDelete(chat.id)">
            删除
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import { formatTime } from '@/utils/format'
import { Modal, message } from 'ant-design-vue'

const router = useRouter()
const chatStore = useChatStore()
const { chatHistories } = storeToRefs(chatStore)

const handleSelectChat = (chatId: string) => {
  chatStore.loadChat(chatId)
  router.push('/')
}

const handleDelete = (chatId: string) => {
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

.history-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &__header {
    padding: $spacing-lg;
    border-bottom: 1px solid var(--border-color);
    
    h2 {
      margin: 0;
      font-size: $font-size-xl;
      color: var(--text-primary);
    }
  }
  
  &__content {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-lg;
  }
  
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacing-lg;
  }
  
  &__item {
    @include card;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    
    &-content {
      flex: 1;
      
      h3 {
        margin: 0 0 $spacing-sm 0;
        font-size: $font-size-lg;
        color: var(--text-primary);
        @include text-ellipsis;
      }
      
      p {
        margin: 0 0 $spacing-xs 0;
        font-size: $font-size-sm;
        color: var(--text-secondary);
      }
    }
  }
}
</style>

