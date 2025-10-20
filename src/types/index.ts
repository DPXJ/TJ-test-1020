/**
 * 消息类型
 */
export type MessageType = 'user' | 'ai' | 'system'

/**
 * 消息状态
 */
export type MessageStatus = 'sending' | 'success' | 'error'

/**
 * 卡片类型
 */
export type CardType = 'upload' | 'select' | 'form' | 'confirm'

/**
 * 主题类型
 */
export type ThemeType = 'light' | 'dark'

/**
 * 操作按钮接口
 */
export interface ActionButton {
  label: string
  type: 'primary' | 'default' | 'danger' | 'link'
  action: string
  icon?: string
  disabled?: boolean
}

/**
 * 卡片数据 - 上传卡片
 */
export interface UploadCardData {
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxCount?: number
}

/**
 * 卡片数据 - 选择卡片
 */
export interface SelectOption {
  label: string
  value: string | number
  description?: string
  icon?: string
  preview?: string
}

export interface SelectCardData {
  options: SelectOption[]
  multiple?: boolean
  searchable?: boolean
}

/**
 * 卡片数据 - 表单卡片
 */
export interface FormField {
  name: string
  label: string
  type: 'input' | 'textarea' | 'select' | 'switch' | 'number' | 'slider'
  placeholder?: string
  required?: boolean
  defaultValue?: any
  options?: SelectOption[]
  min?: number
  max?: number
}

export interface FormCardData {
  fields: FormField[]
  submitText?: string
}

/**
 * 卡片数据 - 确认卡片
 */
export interface ConfirmCardData {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

/**
 * 消息接口
 */
export interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: number
  status?: MessageStatus
  cardType?: CardType
  cardData?: UploadCardData | SelectCardData | FormCardData | ConfirmCardData
  actions?: ActionButton[]
}

/**
 * 聊天历史接口
 */
export interface ChatHistory {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

/**
 * 用户接口
 */
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
}

/**
 * 文件上传响应接口
 */
export interface UploadResponse {
  success: boolean
  fileId: string
  fileName: string
  fileUrl: string
  message?: string
}

/**
 * 聊天响应接口
 */
export interface ChatResponse {
  type: 'text' | 'card'
  content: string
  cardType?: CardType
  cardData?: any
  actions?: ActionButton[]
  timestamp: number
}

/**
 * API响应基础接口
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  code?: number
}

/**
 * 音色选项接口
 */
export interface VoiceOption {
  id: string
  name: string
  gender: 'male' | 'female'
  description: string
  previewUrl?: string
  language: string
}

/**
 * 视频模板接口
 */
export interface VideoTemplate {
  id: string
  name: string
  description: string
  thumbnail: string
  category: string
  tags: string[]
}

/**
 * 转场效果接口
 */
export interface TransitionEffect {
  id: string
  name: string
  description: string
  preview?: string
}

/**
 * 项目接口
 */
export interface Project {
  id: string
  title: string
  description?: string
  thumbnail?: string
  createdAt: number
  updatedAt: number
  userId: string
}

