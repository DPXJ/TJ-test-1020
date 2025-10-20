<template>
  <button
    class="theme-switch"
    :class="{ 'theme-switch--dark': isDark }"
    @click="toggleTheme"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <transition name="fade" mode="out-in">
      <SunOutlined v-if="!isDark" key="sun" class="theme-switch__icon" />
      <MoonOutlined v-else key="moon" class="theme-switch__icon" />
    </transition>
  </button>
</template>

<script setup lang="ts">
import { SunOutlined, MoonOutlined } from '@ant-design/icons-vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.theme-switch {
  @include button-reset;
  @include flex-center;
  width: 40px;
  height: 40px;
  border-radius: $border-radius-round;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  cursor: pointer;
  @include transition(all);
  
  &:hover {
    background: var(--hover-bg);
    border-color: var(--primary-color);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &__icon {
    font-size: 20px;
    color: var(--text-primary);
  }
  
  // 深色模式特殊样式
  &--dark {
    .theme-switch__icon {
      color: var(--accent-color);
    }
    
    &:hover {
      @include glow-effect(var(--accent-color));
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-fast;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

