<template>
  <div class="settings-view">
    <div class="settings-view__header">
      <h2>设置</h2>
    </div>
    
    <div class="settings-view__content">
      <a-card title="主题设置" class="settings-view__card">
        <a-form-item label="当前主题">
          <a-radio-group v-model:value="currentTheme" @change="handleThemeChange">
            <a-radio value="light">浅色模式</a-radio>
            <a-radio value="dark">深色模式</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-card>
      
      <a-card title="用户信息" class="settings-view__card">
        <a-descriptions :column="1">
          <a-descriptions-item label="用户名">
            {{ userName }}
          </a-descriptions-item>
          <a-descriptions-item label="邮箱">
            {{ userEmail }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
      
      <a-card title="数据管理" class="settings-view__card">
        <a-space direction="vertical" style="width: 100%">
          <a-button block @click="handleClearHistory">
            清空聊天历史
          </a-button>
          <a-button block danger @click="handleClearAll">
            清空所有数据
          </a-button>
        </a-space>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'
import { Modal, message } from 'ant-design-vue'

const themeStore = useThemeStore()
const chatStore = useChatStore()
const userStore = useUserStore()

const { userName, userEmail } = storeToRefs(userStore)

const currentTheme = ref(themeStore.theme)

const handleThemeChange = () => {
  themeStore.setTheme(currentTheme.value)
  message.success('主题已切换')
}

const handleClearHistory = () => {
  Modal.confirm({
    title: '确认清空',
    content: '确定要清空所有聊天历史吗？此操作不可逆。',
    okText: '清空',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      chatStore.clearMessages()
      message.success('聊天历史已清空')
    }
  })
}

const handleClearAll = () => {
  Modal.confirm({
    title: '确认清空',
    content: '确定要清空所有数据吗？此操作不可逆，将清空所有聊天记录和设置。',
    okText: '清空',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      localStorage.clear()
      message.success('所有数据已清空，页面将刷新')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.settings-view {
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
  
  &__card {
    margin-bottom: $spacing-lg;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

