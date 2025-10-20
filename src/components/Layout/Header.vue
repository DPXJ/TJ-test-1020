<template>
  <header class="app-header">
    <div class="app-header__left">
      <button class="app-header__menu-btn" @click="emit('toggle-sidebar')">
        <MenuOutlined />
      </button>
      
      <div class="app-header__logo">
        <RobotOutlined class="app-header__logo-icon" />
        <span class="app-header__logo-text">AI视频混剪助手</span>
      </div>
    </div>
    
    <div class="app-header__center">
      <h1 class="app-header__title">{{ title }}</h1>
    </div>
    
    <div class="app-header__right">
      <a-button type="primary" @click="emit('new-chat')">
        <template #icon>
          <PlusOutlined />
        </template>
        新对话
      </a-button>
      
      <ThemeSwitch />
      
      <a-dropdown>
        <a-button class="app-header__user-btn">
          <a-avatar :src="userAvatar" :size="32">
            {{ userName.charAt(0) }}
          </a-avatar>
        </a-button>
        
        <template #overlay>
          <a-menu>
            <a-menu-item key="profile">
              <UserOutlined />
              个人信息
            </a-menu-item>
            <a-menu-item key="settings">
              <SettingOutlined />
              设置
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout" @click="handleLogout">
              <LogoutOutlined />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { 
  MenuOutlined, 
  RobotOutlined, 
  PlusOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import ThemeSwitch from '@/components/Common/ThemeSwitch.vue'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: '对话'
})

const emit = defineEmits<{
  'toggle-sidebar': []
  'new-chat': []
}>()

const userStore = useUserStore()
const { userName, userAvatar } = storeToRefs(userStore)

const handleLogout = () => {
  message.info('演示模式暂不支持退出登录')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.app-header {
  @include flex-between;
  height: $header-height;
  padding: 0 $spacing-lg;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  gap: $spacing-lg;
  @include transition(background, border-color);
  
  &__left,
  &__right {
    @include flex-center;
    gap: $spacing-md;
  }
  
  &__left {
    flex-shrink: 0;
  }
  
  &__right {
    flex-shrink: 0;
  }
  
  &__center {
    flex: 1;
    text-align: center;
    overflow: hidden;
  }
  
  &__menu-btn {
    @include button-reset;
    @include flex-center;
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: var(--text-primary);
    border-radius: $border-radius-md;
    @include transition(all);
    
    &:hover {
      background: var(--hover-bg);
    }
    
    @include desktop {
      display: none;
    }
  }
  
  &__logo {
    @include flex-center;
    gap: $spacing-sm;
    
    &-icon {
      font-size: 28px;
      color: var(--primary-color);
      
      [data-theme='dark'] & {
        color: var(--accent-color);
        filter: drop-shadow(0 0 8px var(--glow-color));
      }
    }
    
    &-text {
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
      color: var(--text-primary);
      
      @include mobile {
        display: none;
      }
    }
  }
  
  &__title {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: var(--text-primary);
    @include text-ellipsis;
  }
  
  &__user-btn {
    padding: 4px;
    height: auto;
    border: none;
    background: transparent;
    
    &:hover {
      background: var(--hover-bg);
    }
  }
}
</style>

