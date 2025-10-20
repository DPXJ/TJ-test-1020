<template>
  <div class="form-card">
    <a-form
      :model="formData"
      :label-col="{ span: 24 }"
      :wrapper-col="{ span: 24 }"
      @finish="handleSubmit"
    >
      <a-form-item
        v-for="field in data.fields"
        :key="field.name"
        :label="field.label"
        :name="field.name"
        :rules="[{ required: field.required, message: `请输入${field.label}` }]"
      >
        <!-- 输入框 -->
        <a-input
          v-if="field.type === 'input'"
          v-model:value="formData[field.name]"
          :placeholder="field.placeholder"
        />
        
        <!-- 文本域 -->
        <a-textarea
          v-else-if="field.type === 'textarea'"
          v-model:value="formData[field.name]"
          :placeholder="field.placeholder"
          :rows="4"
        />
        
        <!-- 选择器 -->
        <a-select
          v-else-if="field.type === 'select'"
          v-model:value="formData[field.name]"
          :placeholder="field.placeholder"
        >
          <a-select-option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
        
        <!-- 数字输入 -->
        <a-input-number
          v-else-if="field.type === 'number'"
          v-model:value="formData[field.name]"
          :placeholder="field.placeholder"
          :min="field.min"
          :max="field.max"
          style="width: 100%"
        />
        
        <!-- 滑块 -->
        <a-slider
          v-else-if="field.type === 'slider'"
          v-model:value="formData[field.name]"
          :min="field.min"
          :max="field.max"
        />
        
        <!-- 开关 -->
        <a-switch
          v-else-if="field.type === 'switch'"
          v-model:checked="formData[field.name]"
        />
      </a-form-item>
      
      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          {{ data.submitText || '提交' }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormCardData } from '@/types'

interface Props {
  data: FormCardData
  messageId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  action: [action: string, data: any]
}>()

// 初始化表单数据
const formData = reactive<Record<string, any>>({})

// 设置默认值
props.data.fields.forEach(field => {
  if (field.defaultValue !== undefined) {
    formData[field.name] = field.defaultValue
  } else if (field.type === 'switch') {
    formData[field.name] = false
  } else {
    formData[field.name] = undefined
  }
})

const handleSubmit = () => {
  emit('action', 'form-submitted', { ...formData })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.form-card {
  margin-top: $spacing-md;
  padding: $spacing-md;
  background: var(--bg-tertiary);
  border-radius: $border-radius-md;
  
  :deep(.ant-form-item) {
    margin-bottom: $spacing-md;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  :deep(.ant-form-item-label > label) {
    color: var(--text-primary);
    font-weight: $font-weight-medium;
  }
}
</style>

