<template>
  <div class="select-card">
    <a-input-search
      v-if="data.searchable"
      v-model:value="searchQuery"
      placeholder="搜索..."
      class="select-card__search"
    />
    
    <div class="select-card__list">
      <div
        v-for="option in filteredOptions"
        :key="option.value"
        class="select-card__option"
        :class="{
          'select-card__option--selected': isSelected(option.value),
          'select-card__option--with-preview': option.preview
        }"
        @click="handleSelect(option)"
      >
        <div v-if="option.preview" class="select-card__preview">
          <img :src="option.preview" :alt="option.label" />
        </div>
        
        <div class="select-card__option-content">
          <component v-if="option.icon" :is="option.icon" class="select-card__option-icon" />
          
          <div class="select-card__option-text">
            <p class="select-card__option-label">{{ option.label }}</p>
            <p v-if="option.description" class="select-card__option-desc">
              {{ option.description }}
            </p>
          </div>
        </div>
        
        <div class="select-card__option-check">
          <CheckOutlined v-if="isSelected(option.value)" />
        </div>
      </div>
    </div>
    
    <div v-if="selectedOptions.length > 0" class="select-card__footer">
      <p class="select-card__selected-count">
        已选择 {{ selectedOptions.length }} 项
      </p>
      <a-button type="primary" @click="handleConfirm">
        确认选择
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import type { SelectCardData, SelectOption } from '@/types'

interface Props {
  data: SelectCardData
  messageId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  action: [action: string, data: any]
}>()

const searchQuery = ref('')
const selectedOptions = ref<SelectOption[]>([])

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.data.options
  
  const query = searchQuery.value.toLowerCase()
  return props.data.options.filter(option =>
    option.label.toLowerCase().includes(query) ||
    option.description?.toLowerCase().includes(query)
  )
})

const isSelected = (value: string | number) => {
  return selectedOptions.value.some(opt => opt.value === value)
}

const handleSelect = (option: SelectOption) => {
  if (props.data.multiple) {
    // 多选
    const index = selectedOptions.value.findIndex(opt => opt.value === option.value)
    if (index > -1) {
      selectedOptions.value.splice(index, 1)
    } else {
      selectedOptions.value.push(option)
    }
  } else {
    // 单选，直接确认
    selectedOptions.value = [option]
    handleConfirm()
  }
}

const handleConfirm = () => {
  emit('action', 'option-selected', {
    options: selectedOptions.value,
    label: selectedOptions.value.map(opt => opt.label).join(', ')
  })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.select-card {
  margin-top: $spacing-md;
  
  &__search {
    margin-bottom: $spacing-md;
  }
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    max-height: 400px;
    overflow-y: auto;
    @include scrollbar;
  }
  
  &__option {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md;
    background: var(--bg-tertiary);
    border: 2px solid transparent;
    border-radius: $border-radius-md;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      background: var(--hover-bg);
      border-color: var(--primary-color);
    }
    
    &--selected {
      background: var(--active-bg);
      border-color: var(--primary-color);
      
      [data-theme='dark'] & {
        background: var(--bg-tertiary);
        @include glow-effect;
      }
    }
    
    &--with-preview {
      flex-direction: column;
      align-items: stretch;
    }
    
    &-content {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      flex: 1;
    }
    
    &-icon {
      font-size: 24px;
      color: var(--text-secondary);
    }
    
    &-text {
      flex: 1;
    }
    
    &-label {
      margin: 0 0 4px 0;
      font-size: $font-size-md;
      font-weight: $font-weight-medium;
      color: var(--text-primary);
    }
    
    &-desc {
      margin: 0;
      font-size: $font-size-sm;
      color: var(--text-secondary);
      line-height: $line-height-normal;
    }
    
    &-check {
      font-size: 20px;
      color: var(--primary-color);
    }
  }
  
  &__preview {
    width: 100%;
    height: 150px;
    margin-bottom: $spacing-md;
    border-radius: $border-radius-md;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__footer {
    @include flex-between;
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid var(--border-light);
  }
  
  &__selected-count {
    margin: 0;
    font-size: $font-size-sm;
    color: var(--text-secondary);
  }
}
</style>

