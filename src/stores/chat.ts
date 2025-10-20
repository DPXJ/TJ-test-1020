import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Message, ChatHistory } from '@/types'
import { matchAIResponse } from '@/mock/responses'
import { createUserMessage, createSystemMessage, generateMessageId, mockAIResponses } from '@/mock/messages'

const CHAT_HISTORY_KEY = 'ai-video-editor-chat-history'
const CURRENT_CHAT_KEY = 'ai-video-editor-current-chat'

export const useChatStore = defineStore('chat', () => {
  // 状态
  const messages = ref<Message[]>([])
  const chatHistories = ref<ChatHistory[]>([])
  const currentChatId = ref<string>('')
  const isAITyping = ref(false)
  const isLoading = ref(false)
  
  // 初始化
  const init = () => {
    loadChatHistories()
    const savedChatId = localStorage.getItem(CURRENT_CHAT_KEY)
    
    if (savedChatId && chatHistories.value.find(h => h.id === savedChatId)) {
      loadChat(savedChatId)
    } else {
      // 创建新对话并显示欢迎消息
      createNewChat()
      addMessage({
        ...mockAIResponses.welcome,
        id: generateMessageId(),
        timestamp: Date.now()
      })
    }
  }
  
  // 加载聊天历史列表
  const loadChatHistories = () => {
    try {
      const saved = localStorage.getItem(CHAT_HISTORY_KEY)
      if (saved) {
        chatHistories.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Failed to load chat histories:', error)
      chatHistories.value = []
    }
  }
  
  // 保存聊天历史
  const saveChatHistories = () => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistories.value))
    } catch (error) {
      console.error('Failed to save chat histories:', error)
    }
  }
  
  // 创建新对话
  const createNewChat = () => {
    const newChat: ChatHistory = {
      id: `chat-${Date.now()}`,
      title: '新对话',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    
    chatHistories.value.unshift(newChat)
    currentChatId.value = newChat.id
    messages.value = []
    
    localStorage.setItem(CURRENT_CHAT_KEY, newChat.id)
    saveChatHistories()
  }
  
  // 加载对话
  const loadChat = (chatId: string) => {
    const chat = chatHistories.value.find(h => h.id === chatId)
    if (chat) {
      currentChatId.value = chatId
      messages.value = chat.messages
      localStorage.setItem(CURRENT_CHAT_KEY, chatId)
    }
  }
  
  // 更新当前对话
  const updateCurrentChat = () => {
    const chat = chatHistories.value.find(h => h.id === currentChatId.value)
    if (chat) {
      chat.messages = [...messages.value]
      chat.updatedAt = Date.now()
      
      // 根据第一条用户消息更新标题
      if (chat.title === '新对话') {
        const firstUserMessage = messages.value.find(m => m.type === 'user')
        if (firstUserMessage) {
          chat.title = firstUserMessage.content.slice(0, 20) + (firstUserMessage.content.length > 20 ? '...' : '')
        }
      }
      
      saveChatHistories()
    }
  }
  
  // 添加消息
  const addMessage = (message: Message) => {
    messages.value.push(message)
    updateCurrentChat()
  }
  
  // 发送消息
  const sendMessage = async (content: string) => {
    if (!content.trim()) return
    
    // 添加用户消息
    const userMessage = createUserMessage(content.trim())
    addMessage(userMessage)
    
    // 显示AI正在输入
    isAITyping.value = true
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
    
    // 获取AI响应
    const aiResponse = matchAIResponse(content)
    addMessage(aiResponse)
    
    isAITyping.value = false
  }
  
  // 重新发送消息
  const resendMessage = async (messageId: string) => {
    const messageIndex = messages.value.findIndex(m => m.id === messageId)
    if (messageIndex === -1) return
    
    const message = messages.value[messageIndex]
    if (message.type !== 'user') return
    
    // 移除该消息及之后的所有消息
    messages.value = messages.value.slice(0, messageIndex)
    updateCurrentChat()
    
    // 重新发送
    await sendMessage(message.content)
  }
  
  // 删除消息
  const deleteMessage = (messageId: string) => {
    const index = messages.value.findIndex(m => m.id === messageId)
    if (index !== -1) {
      messages.value.splice(index, 1)
      updateCurrentChat()
    }
  }
  
  // 清空当前对话
  const clearMessages = () => {
    messages.value = []
    updateCurrentChat()
  }
  
  // 删除对话历史
  const deleteChatHistory = (chatId: string) => {
    const index = chatHistories.value.findIndex(h => h.id === chatId)
    if (index !== -1) {
      chatHistories.value.splice(index, 1)
      saveChatHistories()
      
      // 如果删除的是当前对话，切换到其他对话或创建新对话
      if (chatId === currentChatId.value) {
        if (chatHistories.value.length > 0) {
          loadChat(chatHistories.value[0].id)
        } else {
          createNewChat()
        }
      }
    }
  }
  
  // 处理卡片操作
  const handleCardAction = async (messageId: string, action: string, data?: any) => {
    // 添加系统消息显示用户的操作
    let systemMessageContent = ''
    
    switch (action) {
      case 'file-uploaded':
        systemMessageContent = `已上传文件：${data.fileName}`
        break
      case 'option-selected':
        systemMessageContent = `已选择：${data.label}`
        break
      case 'form-submitted':
        systemMessageContent = '表单已提交'
        break
      case 'confirmed':
        systemMessageContent = '操作已确认'
        break
      case 'cancelled':
        systemMessageContent = '操作已取消'
        break
      default:
        systemMessageContent = '操作完成'
    }
    
    if (systemMessageContent) {
      addMessage(createSystemMessage(systemMessageContent))
    }
    
    // 模拟AI响应
    isAITyping.value = true
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const responses: Record<string, string> = {
      'file-uploaded': '文件上传成功！接下来我们可以开始编辑了。',
      'option-selected': '好的，已为您选择。让我们继续下一步。',
      'form-submitted': '信息已收到，正在处理...',
      'confirmed': '正在执行操作，请稍候...',
      'cancelled': '好的，已取消操作。还有其他需要吗？'
    }
    
    const responseContent = responses[action] || '操作完成！'
    addMessage({
      id: generateMessageId(),
      type: 'ai',
      content: responseContent,
      timestamp: Date.now(),
      status: 'success'
    })
    
    isAITyping.value = false
  }
  
  // Getters
  const currentChat = computed(() => 
    chatHistories.value.find(h => h.id === currentChatId.value)
  )
  
  const hasMessages = computed(() => messages.value.length > 0)
  
  const messageCount = computed(() => messages.value.length)
  
  return {
    messages,
    chatHistories,
    currentChatId,
    isAITyping,
    isLoading,
    currentChat,
    hasMessages,
    messageCount,
    init,
    createNewChat,
    loadChat,
    sendMessage,
    resendMessage,
    deleteMessage,
    clearMessages,
    deleteChatHistory,
    handleCardAction,
    addMessage
  }
})

