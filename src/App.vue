<template>
  <a-config-provider :locale="zhCN">
    <AppLayout>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </AppLayout>
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import AppLayout from '@/components/Layout/AppLayout.vue'
import { useThemeStore } from '@/stores/theme'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'

// 初始化stores
const themeStore = useThemeStore()
const chatStore = useChatStore()
const userStore = useUserStore()

onMounted(() => {
  // 初始化主题
  themeStore.initTheme()
  
  // 初始化用户
  userStore.init()
  
  // 初始化聊天
  chatStore.init()
})
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';
@import 'highlight.js/styles/github.css';
@import 'highlight.js/styles/github-dark.css' (prefers-color-scheme: dark);
</style>

