<template>
    <div class="index-container">
        <img :src="`src/components/icons/base/${currentTheme === 'light' ? 'dark' : 'light'}/back.svg`" alt="back"
            class="icon-index" />
        <span class="index-text">{{ currentIndex }}/{{ totalWords }}</span>
        <img :src="`src/components/icons/base/${currentTheme === 'light' ? 'dark' : 'light'}/bin.svg`" alt="bin"
            class="icon-index" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { ref } from 'vue';

interface Props {
    currentTheme?: 'dark' | 'light';
    totalWords?: number;
    currentIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
    currentTheme: 'dark',
    totalWords: 0,
    currentIndex: 0
});

// 添加响应式主题变化
import { watch } from 'vue';
watch(() => props.currentTheme, () => {
    // 强制重新渲染
    console.log('Theme changed:', props.currentTheme);
});

</script>

<style scoped>
.index-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 7px;
}

.icon-index {
  width: 21px;
  height: 21px;
  cursor: pointer;
}

.index-text {
  font-family: var(--font-family-main);
  font-size: calc(var(--font-size-large) * 0.7);
  font-weight: var(--font-weight-normal);
}
</style>
