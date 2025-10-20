<template>
  <div class="chat-view">
    <AIChatBox />
  </div>
</template>

<script setup lang="ts">
import AIChatBox from '@/components/AI/AIChatBox.vue'
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.chat-view {
  width: 100%;
  height: 100%;
}
</style>

