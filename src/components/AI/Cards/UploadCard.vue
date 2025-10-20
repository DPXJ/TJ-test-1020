<template>
  <div class="upload-card">
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="data.multiple"
      :accept="data.accept"
      :max-count="data.maxCount"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      @change="handleChange"
    >
      <p class="upload-card__icon">
        <InboxOutlined />
      </p>
      <p class="upload-card__text">点击或拖拽文件到此区域上传</p>
      <p class="upload-card__hint">
        {{ data.accept || '支持所有格式' }}
        {{ data.maxSize ? ` · 最大${formatFileSize(data.maxSize)}` : '' }}
        {{ data.maxCount ? ` · 最多${data.maxCount}个文件` : '' }}
      </p>
    </a-upload-dragger>
    
    <div v-if="fileList.length > 0" class="upload-card__list">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="upload-card__item"
      >
        <div class="upload-card__item-info">
          <FileOutlined class="upload-card__item-icon" />
          <div class="upload-card__item-content">
            <p class="upload-card__item-name">{{ file.name }}</p>
            <p class="upload-card__item-size">{{ formatFileSize(file.size || 0) }}</p>
          </div>
        </div>
        
        <div class="upload-card__item-status">
          <LoadingOutlined v-if="file.status === 'uploading'" spin />
          <CheckCircleOutlined v-else-if="file.status === 'done'" style="color: var(--success-color)" />
          <CloseCircleOutlined v-else-if="file.status === 'error'" style="color: var(--error-color)" />
        </div>
        
        <a-progress
          v-if="file.status === 'uploading'"
          :percent="file.percent || 0"
          :show-info="false"
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadProps, UploadFile } from 'ant-design-vue'
import {
  InboxOutlined,
  FileOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'
import type { UploadCardData } from '@/types'
import { formatFileSize } from '@/utils/format'
import { message } from 'ant-design-vue'

interface Props {
  data: UploadCardData
  messageId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  action: [action: string, data: any]
}>()

const fileList = ref<UploadFile[]>([])

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  // 检查文件大小
  if (props.data.maxSize && file.size && file.size > props.data.maxSize) {
    message.error(`文件大小不能超过 ${formatFileSize(props.data.maxSize)}`)
    return false
  }
  return true
}

const customRequest: UploadProps['customRequest'] = (options) => {
  const { file, onProgress, onSuccess, onError } = options
  
  // 模拟上传过程
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    onProgress?.({ percent: progress } as any)
    
    if (progress >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        // 模拟上传成功
        const uploadedFile = file as UploadFile
        onSuccess?.({
          fileId: `file-${Date.now()}`,
          fileName: uploadedFile.name,
          fileUrl: URL.createObjectURL(file as File)
        })
        
        // 触发上传完成事件
        emit('action', 'file-uploaded', {
          fileName: uploadedFile.name,
          fileSize: uploadedFile.size
        })
      }, 300)
    }
  }, 200)
}

const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
  fileList.value = newFileList
  
  if (file.status === 'error') {
    message.error(`${file.name} 上传失败`)
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.upload-card {
  margin-top: $spacing-md;
  
  :deep(.ant-upload-drag) {
    background: var(--bg-tertiary);
    border-color: var(--border-color);
    @include transition(all);
    
    &:hover {
      border-color: var(--primary-color);
    }
  }
  
  &__icon {
    font-size: 48px;
    color: var(--primary-color);
    margin-bottom: $spacing-sm;
    
    [data-theme='dark'] & {
      color: var(--accent-color);
    }
  }
  
  &__text {
    margin: 0 0 $spacing-xs 0;
    font-size: $font-size-md;
    color: var(--text-primary);
  }
  
  &__hint {
    margin: 0;
    font-size: $font-size-sm;
    color: var(--text-tertiary);
  }
  
  &__list {
    margin-top: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }
  
  &__item {
    padding: $spacing-md;
    background: var(--bg-tertiary);
    border-radius: $border-radius-md;
    @include transition(all);
    
    &:hover {
      background: var(--hover-bg);
    }
    
    &-info {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      margin-bottom: $spacing-sm;
    }
    
    &-icon {
      font-size: 24px;
      color: var(--text-secondary);
    }
    
    &-content {
      flex: 1;
      overflow: hidden;
    }
    
    &-name {
      margin: 0 0 4px 0;
      font-size: $font-size-sm;
      color: var(--text-primary);
      @include text-ellipsis;
    }
    
    &-size {
      margin: 0;
      font-size: $font-size-xs;
      color: var(--text-tertiary);
    }
    
    &-status {
      font-size: 20px;
    }
  }
}
</style>

