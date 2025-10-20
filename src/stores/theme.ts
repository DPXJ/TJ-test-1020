import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { ThemeType } from '@/types'

const THEME_STORAGE_KEY = 'ai-video-editor-theme'

export const useThemeStore = defineStore('theme', () => {
  // 状态
  const theme = ref<ThemeType>('light')
  
  // 初始化主题
  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      theme.value = savedTheme
    } else {
      // 检测系统主题偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }
    applyTheme(theme.value)
  }
  
  // 应用主题
  const applyTheme = (newTheme: ThemeType) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  
  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  // 设置主题
  const setTheme = (newTheme: ThemeType) => {
    theme.value = newTheme
  }
  
  // 监听主题变化，保存到本地存储并应用
  watch(theme, (newTheme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    applyTheme(newTheme)
  })
  
  // Getters
  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')
  
  return {
    theme,
    isDark,
    isLight,
    initTheme,
    toggleTheme,
    setTheme
  }
})

