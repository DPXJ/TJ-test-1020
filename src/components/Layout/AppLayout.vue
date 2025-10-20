<template>
  <div class="app-layout">
    <Header 
      :title="pageTitle" 
      @toggle-sidebar="toggleSidebar" 
      @new-chat="handleNewChat"
    />
    
    <div class="app-layout__body">
      <Sidebar 
        :collapsed="!sidebarVisible" 
        @close="closeSidebar"
        @new-chat="handleNewChat"
      />
      
      <main class="app-layout__main">
        <slot />
      </main>
    </div>
    
    <!-- 移动端蒙层 -->
    <div 
      v-if="sidebarVisible" 
      class="app-layout__overlay"
      @click="closeSidebar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import { useChatStore } from '@/stores/chat'

const route = useRoute()
const chatStore = useChatStore()

const sidebarVisible = ref(false)

const pageTitle = computed(() => {
  return (route.meta.title as string) || '对话'
})

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const closeSidebar = () => {
  sidebarVisible.value = false
}

const handleNewChat = () => {
  chatStore.createNewChat()
  closeSidebar()
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.app-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  
  &__body {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
  }
  
  &__main {
    flex: 1;
    overflow: hidden;
    background: var(--bg-color);
  }
  
  &__overlay {
    display: none;
    
    @include mobile {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: $z-index-fixed - 1;
      animation: fadeIn $transition-normal;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

