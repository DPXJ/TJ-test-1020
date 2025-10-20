import type { Message, SelectOption, VoiceOption, VideoTemplate, TransitionEffect } from '@/types'

/**
 * 音色选项数据
 */
export const mockVoiceOptions: VoiceOption[] = [
  {
    id: 'voice-1',
    name: '成熟男声 - 张明',
    gender: 'male',
    description: '沉稳大气，适合商业宣传',
    language: 'zh-CN'
  },
  {
    id: 'voice-2',
    name: '知性女声 - 李雅',
    gender: 'female',
    description: '温柔亲切，适合教育培训',
    language: 'zh-CN'
  },
  {
    id: 'voice-3',
    name: '活力男声 - 王阳',
    gender: 'male',
    description: '年轻有活力，适合短视频',
    language: 'zh-CN'
  },
  {
    id: 'voice-4',
    name: '甜美女声 - 小美',
    gender: 'female',
    description: '甜美可爱，适合生活分享',
    language: 'zh-CN'
  },
  {
    id: 'voice-5',
    name: '磁性男声 - 陈峰',
    gender: 'male',
    description: '低沉磁性，适合纪录片',
    language: 'zh-CN'
  },
  {
    id: 'voice-6',
    name: '专业女声 - 刘静',
    gender: 'female',
    description: '专业严谨，适合新闻播报',
    language: 'zh-CN'
  },
  {
    id: 'voice-7',
    name: '幽默男声 - 赵伟',
    gender: 'male',
    description: '幽默风趣，适合娱乐内容',
    language: 'zh-CN'
  },
  {
    id: 'voice-8',
    name: '清新女声 - 周婷',
    gender: 'female',
    description: '清新自然，适合VLOG',
    language: 'zh-CN'
  }
]

/**
 * 视频模板数据
 */
export const mockVideoTemplates: VideoTemplate[] = [
  {
    id: 'template-1',
    name: '科技发布会',
    description: '适合产品发布、科技展示的专业模板',
    thumbnail: 'https://via.placeholder.com/300x200?text=科技发布会',
    category: '商业',
    tags: ['科技', '商业', '发布会']
  },
  {
    id: 'template-2',
    name: '企业宣传片',
    description: '展示企业实力和文化的经典模板',
    thumbnail: 'https://via.placeholder.com/300x200?text=企业宣传片',
    category: '商业',
    tags: ['企业', '宣传', '品牌']
  },
  {
    id: 'template-3',
    name: '教育培训',
    description: '适合在线课程、知识分享的清晰模板',
    thumbnail: 'https://via.placeholder.com/300x200?text=教育培训',
    category: '教育',
    tags: ['教育', '培训', '课程']
  },
  {
    id: 'template-4',
    name: '旅行VLOG',
    description: '记录旅行美好瞬间的活力模板',
    thumbnail: 'https://via.placeholder.com/300x200?text=旅行VLOG',
    category: '生活',
    tags: ['旅行', 'VLOG', '生活']
  },
  {
    id: 'template-5',
    name: '美食探店',
    description: '展示美食魅力的诱人模板',
    thumbnail: 'https://via.placeholder.com/300x200?text=美食探店',
    category: '生活',
    tags: ['美食', '探店', '生活']
  },
  {
    id: 'template-6',
    name: '运动健身',
    description: '动感十足的运动健身模板',
    thumbnail: 'https://via.placeholder.com/300x200?text=运动健身',
    category: '生活',
    tags: ['运动', '健身', '活力']
  }
]

/**
 * 转场效果数据
 */
export const mockTransitionEffects: TransitionEffect[] = [
  {
    id: 'transition-1',
    name: '淡入淡出',
    description: '经典平滑过渡效果'
  },
  {
    id: 'transition-2',
    name: '溶解',
    description: '画面溶解过渡'
  },
  {
    id: 'transition-3',
    name: '滑动',
    description: '画面滑动切换'
  },
  {
    id: 'transition-4',
    name: '缩放',
    description: '画面缩放过渡'
  },
  {
    id: 'transition-5',
    name: '翻转',
    description: '3D翻转效果'
  },
  {
    id: 'transition-6',
    name: '擦除',
    description: '擦除过渡效果'
  }
]

/**
 * 预设的AI响应模板
 */
export const mockAIResponses: Record<string, Message> = {
  welcome: {
    id: 'msg-welcome',
    type: 'ai',
    content: '你好！我是你的AI视频混剪助手。👋\n\n我可以帮你：\n- 🎬 快速创建和编辑视频\n- 🎙️ 为视频配音\n- ✨ 添加转场和特效\n- 📝 生成字幕和标题\n\n告诉我你想做什么吧！',
    timestamp: Date.now(),
    status: 'success'
  },
  uploadPrompt: {
    id: 'msg-upload-prompt',
    type: 'ai',
    content: '好的，请上传你的视频素材。支持MP4、MOV、AVI等常见格式，单个文件最大500MB。',
    timestamp: Date.now(),
    status: 'success',
    cardType: 'upload',
    cardData: {
      accept: 'video/*',
      multiple: true,
      maxSize: 500 * 1024 * 1024,
      maxCount: 10
    }
  },
  voiceSelect: {
    id: 'msg-voice-select',
    type: 'ai',
    content: '请选择一个配音音色，您可以点击试听每个音色的效果：',
    timestamp: Date.now(),
    status: 'success',
    cardType: 'select',
    cardData: {
      options: mockVoiceOptions.map(voice => ({
        label: voice.name,
        value: voice.id,
        description: voice.description,
        icon: voice.gender === 'male' ? 'UserOutlined' : 'WomanOutlined'
      })),
      multiple: false,
      searchable: true
    }
  },
  templateSelect: {
    id: 'msg-template-select',
    type: 'ai',
    content: '为您推荐以下视频模板，请选择一个：',
    timestamp: Date.now(),
    status: 'success',
    cardType: 'select',
    cardData: {
      options: mockVideoTemplates.map(template => ({
        label: template.name,
        value: template.id,
        description: template.description,
        preview: template.thumbnail
      })),
      multiple: false,
      searchable: true
    }
  },
  transitionSelect: {
    id: 'msg-transition-select',
    type: 'ai',
    content: '请选择一个转场效果：',
    timestamp: Date.now(),
    status: 'success',
    cardType: 'select',
    cardData: {
      options: mockTransitionEffects.map(effect => ({
        label: effect.name,
        value: effect.id,
        description: effect.description
      })),
      multiple: false
    }
  },
  videoInfoForm: {
    id: 'msg-video-info-form',
    type: 'ai',
    content: '请填写视频的基本信息：',
    timestamp: Date.now(),
    status: 'success',
    cardType: 'form',
    cardData: {
      fields: [
        {
          name: 'title',
          label: '视频标题',
          type: 'input',
          placeholder: '请输入视频标题',
          required: true
        },
        {
          name: 'description',
          label: '视频描述',
          type: 'textarea',
          placeholder: '请输入视频描述'
        },
        {
          name: 'category',
          label: '视频分类',
          type: 'select',
          required: true,
          options: [
            { label: '商业', value: 'business' },
            { label: '教育', value: 'education' },
            { label: '生活', value: 'life' },
            { label: '娱乐', value: 'entertainment' }
          ]
        },
        {
          name: 'quality',
          label: '导出质量',
          type: 'select',
          defaultValue: '1080p',
          options: [
            { label: '720P', value: '720p' },
            { label: '1080P (推荐)', value: '1080p' },
            { label: '4K', value: '4k' }
          ]
        },
        {
          name: 'addWatermark',
          label: '添加水印',
          type: 'switch',
          defaultValue: true
        }
      ],
      submitText: '确认'
    }
  },
  renderConfirm: {
    id: 'msg-render-confirm',
    type: 'ai',
    content: '视频编辑已完成，是否开始渲染？',
    timestamp: Date.now(),
    status: 'success',
    cardType: 'confirm',
    cardData: {
      title: '确认渲染',
      description: '视频时长：2分30秒\n预计渲染时间：3-5分钟\n导出格式：MP4 (1080P)',
      confirmText: '开始渲染',
      cancelText: '稍后再说'
    }
  },
  deleteConfirm: {
    id: 'msg-delete-confirm',
    type: 'ai',
    content: '确认要删除这个素材吗？删除后无法恢复。',
    timestamp: Date.now(),
    status: 'success',
    cardType: 'confirm',
    cardData: {
      title: '确认删除',
      description: '此操作不可逆，请谨慎操作。',
      confirmText: '确认删除',
      cancelText: '取消',
      danger: true
    }
  }
}

/**
 * 生成随机消息ID
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 创建用户消息
 */
export function createUserMessage(content: string): Message {
  return {
    id: generateMessageId(),
    type: 'user',
    content,
    timestamp: Date.now(),
    status: 'success'
  }
}

/**
 * 创建系统消息
 */
export function createSystemMessage(content: string): Message {
  return {
    id: generateMessageId(),
    type: 'system',
    content,
    timestamp: Date.now(),
    status: 'success'
  }
}

/**
 * 模拟AI响应延迟
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

