<template>
    <!-- 词义部分 -->
    <div class="definitions-section">
      <div class="definition-item" v-for="(def, index) in definitions" :key="index">
        <span class="part-of-speech">{{ def.pos }}</span>
        <span class="definition-text" v-if="isShow">{{ def.definition }}</span>
      </div>
    </div>
</template>

<script lang="ts" setup>
interface Definition {
  pos: string;       // 词性
  definition: string; // 定义
}

interface Props {
  currentTheme?: 'dark' | 'light';  // 主题类型
  word?: string;            // 单词
  definitions?: Definition[]; // 词义列表
  isShow?: boolean;
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  currentTheme: 'dark',
  word: 'vocabulary',
  definitions: () => [
    { pos: 'n.', definition: '词汇；术语' },
    { pos: 'adj.', definition: '词汇；术语' }
  ],
  isShow: true
});

</script>

<style>
@import '../assets/main.css';
/* 词义部分 */
.definitions-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 7px;
}

.definition-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3.5px;
  padding: 1.4px 5.6px;
  width: 100%;
}

.part-of-speech {
  font-family: var(--font-family-main);
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-orange);
}

.definition-text {
  font-family: var(--font-family-main);
  font-size: 19px;
  font-weight: var(--font-weight-bold);
}

.hide {
  display: none
}

</style>