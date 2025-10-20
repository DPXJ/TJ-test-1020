import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

const USER_STORAGE_KEY = 'ai-video-editor-user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const isLoading = ref(false)
  
  // 初始化
  const init = () => {
    loadUser()
  }
  
  // 加载用户信息
  const loadUser = () => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY)
      if (saved) {
        user.value = JSON.parse(saved)
        isLoggedIn.value = true
      } else {
        // 演示模式：自动登录一个默认用户
        loginAsGuest()
      }
    } catch (error) {
      console.error('Failed to load user:', error)
      user.value = null
      isLoggedIn.value = false
    }
  }
  
  // 保存用户信息
  const saveUser = () => {
    try {
      if (user.value) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user.value))
      } else {
        localStorage.removeItem(USER_STORAGE_KEY)
      }
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }
  
  // 登录（演示用）
  const login = async (username: string, password: string): Promise<boolean> => {
    isLoading.value = true
    
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 演示模式：任何用户名密码都能登录
    user.value = {
      id: `user-${Date.now()}`,
      username: username,
      email: `${username}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    }
    
    isLoggedIn.value = true
    saveUser()
    isLoading.value = false
    
    return true
  }
  
  // 游客登录
  const loginAsGuest = () => {
    user.value = {
      id: 'guest',
      username: '演示用户',
      email: 'demo@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'
    }
    isLoggedIn.value = true
    saveUser()
  }
  
  // 登出
  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem(USER_STORAGE_KEY)
  }
  
  // 更新用户信息
  const updateUser = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      saveUser()
    }
  }
  
  // Getters
  const userName = computed(() => user.value?.username || '游客')
  const userAvatar = computed(() => user.value?.avatar)
  const userEmail = computed(() => user.value?.email)
  
  return {
    user,
    isLoggedIn,
    isLoading,
    userName,
    userAvatar,
    userEmail,
    init,
    login,
    loginAsGuest,
    logout,
    updateUser
  }
})

