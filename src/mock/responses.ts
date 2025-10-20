import type { Message } from '@/types'
import { generateMessageId, mockAIResponses } from './messages'

/**
 * 关键词匹配映射
 */
const keywordMap: Record<string, string[]> = {
  uploadPrompt: ['上传', '导入', '添加素材', '传视频', '传文件'],
  voiceSelect: ['配音', '音色', '朗读', '播报', '语音'],
  templateSelect: ['模板', '套用模板', '使用模板'],
  transitionSelect: ['转场', '过渡', '切换效果'],
  videoInfoForm: ['设置', '标题', '信息', '填写'],
  renderConfirm: ['渲染', '导出', '生成视频', '完成'],
  deleteConfirm: ['删除', '移除', '清除']
}

/**
 * 通用AI响应模板
 */
const genericResponses = [
  '好的，我明白了。让我来帮你处理。',
  '正在为你处理这个请求...',
  '这是一个很好的想法！我来帮你实现。',
  '收到！马上为你操作。'
]

/**
 * 根据用户输入匹配AI响应
 */
export function matchAIResponse(userInput: string): Message {
  const input = userInput.toLowerCase().trim()
  
  // 遍历关键词映射，找到匹配的响应
  for (const [responseKey, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => input.includes(keyword))) {
      return {
        ...mockAIResponses[responseKey],
        id: generateMessageId(),
        timestamp: Date.now()
      }
    }
  }
  
  // 处理特殊的对话场景
  if (input.includes('你好') || input.includes('hi') || input.includes('hello')) {
    return {
      ...mockAIResponses.welcome,
      id: generateMessageId(),
      timestamp: Date.now()
    }
  }
  
  if (input.includes('帮助') || input.includes('功能') || input.includes('能做什么')) {
    return {
      id: generateMessageId(),
      type: 'ai',
      content: `我可以帮你完成以下操作：

🎬 **视频编辑**
- 上传和管理视频素材
- 剪辑、拼接视频片段
- 添加转场效果

✨ **特效和样式**
- 添加文字和字幕
- 应用视频模板
- 调整视频效果

🎙️ **音频处理**
- AI智能配音
- 添加背景音乐
- 调整音量和音效

📤 **导出和分享**
- 渲染高清视频
- 多种格式导出
- 一键分享

你想要做什么呢？`,
      timestamp: Date.now(),
      status: 'success'
    }
  }
  
  if (input.includes('谢谢') || input.includes('感谢')) {
    return {
      id: generateMessageId(),
      type: 'ai',
      content: '不客气！很高兴能帮到你。还有其他需要吗？😊',
      timestamp: Date.now(),
      status: 'success'
    }
  }
  
  // 视频编辑相关
  if (input.includes('字幕') || input.includes('文字')) {
    return {
      id: generateMessageId(),
      type: 'ai',
      content: '好的，我可以帮你添加字幕。请告诉我：\n1. 字幕内容是什么？\n2. 希望字幕出现在什么位置？\n3. 需要什么样的字体样式？',
      timestamp: Date.now(),
      status: 'success',
      actions: [
        { label: '自动识别字幕', type: 'primary', action: 'auto-subtitle' },
        { label: '手动输入', type: 'default', action: 'manual-subtitle' }
      ]
    }
  }
  
  if (input.includes('背景音乐') || input.includes('bgm')) {
    return {
      id: generateMessageId(),
      type: 'ai',
      content: '我可以帮你添加背景音乐。你想要：',
      timestamp: Date.now(),
      status: 'success',
      actions: [
        { label: '从音乐库选择', type: 'primary', action: 'select-music' },
        { label: '上传本地音乐', type: 'default', action: 'upload-music' },
        { label: 'AI生成音乐', type: 'default', action: 'generate-music' }
      ]
    }
  }
  
  if (input.includes('剪辑') || input.includes('裁剪') || input.includes('分割')) {
    return {
      id: generateMessageId(),
      type: 'ai',
      content: '我来帮你剪辑视频。请告诉我需要保留哪个时间段，例如：\n- "保留前30秒"\n- "删除0:15到0:30的部分"\n- "只要中间一分钟"',
      timestamp: Date.now(),
      status: 'success'
    }
  }
  
  if (input.includes('拼接') || input.includes('合并')) {
    return {
      id: generateMessageId(),
      type: 'ai',
      content: '好的，我会按照你上传的顺序将视频拼接起来。需要在视频之间添加转场效果吗？',
      timestamp: Date.now(),
      status: 'success',
      actions: [
        { label: '添加转场', type: 'primary', action: 'add-transition' },
        { label: '直接拼接', type: 'default', action: 'direct-merge' }
      ]
    }
  }
  
  // 如果没有匹配到特定响应，返回通用响应
  const randomIndex = Math.floor(Math.random() * genericResponses.length)
  return {
    id: generateMessageId(),
    type: 'ai',
    content: genericResponses[randomIndex] + '\n\n' + 
      '你可以试试说：\n- "上传视频素材"\n- "为视频配音"\n- "使用模板"\n- "查看帮助"',
    timestamp: Date.now(),
    status: 'success'
  }
}

/**
 * 模拟打字机效果的响应
 */
export async function* streamAIResponse(message: Message): AsyncGenerator<string> {
  const content = message.content
  const speed = 30 // 打字速度（毫秒/字符）
  
  for (let i = 0; i <= content.length; i++) {
    yield content.slice(0, i)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

