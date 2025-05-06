<template>
  <div class="option-bar" :class="[type]">
    <!-- 标题区域：节号 -->
    <div class="section-title">
      <img src="@/components/components-option-icons/prev-icon-light.svg" alt="上一节" class="nav-arrow prev-arrow" v-if="type === 'dark'" @click="handlePrevSection">
      <img src="@/components/components-option-icons/prev-icon-dark.svg" alt="上一节" class="nav-arrow prev-arrow" v-else @click="handlePrevSection">
      <span class="section-text">第 {{ sectionNumber }} 节</span>
      <img src="@/components/components-option-icons/next-icon-light.svg" alt="下一节" class="nav-arrow next-arrow" v-if="type === 'dark'" @click="handleNextSection">
      <img src="@/components/components-option-icons/next-icon-dark.svg" alt="下一节" class="nav-arrow next-arrow" v-else @click="handleNextSection">
    </div>

    <!-- 词数统计 -->
    <div class="word-count">    
      <span class="count-label">总词数：</span>
      <span class="count-value">{{ wordCount }}</span>
    </div>

    <!-- 选项区域 -->
    <div class="option-item">
      <span class="option-label">自动打乱：</span>
      <bingo :type="type" :onBingo="options.shuffle ? 'true' : 'false'" @click="toggleOption('shuffle')"/>
    </div>
    
    <div class="option-item">
      <span class="option-label">自动发音：</span>
      <bingo :type="type" :onBingo="options.autoPlay ? 'true' : 'false'" @click="toggleOption('autoPlay')"/>
    </div>
    
    <div class="option-item">
      <span class="option-label">显示音标：</span>
      <bingo :type="type" :onBingo="options.showPhonetic ? 'true' : 'false'" @click="toggleOption('showPhonetic')"/>
    </div>
    
    <div class="option-item">
      <span class="option-label">纳入统计：</span>
      <bingo :type="type" :onBingo="options.includeStats ? 'true' : 'false'" @click="toggleOption('includeStats')"/>
    </div>
    
    <div class="option-item">
      <span class="option-label">立刻纠错：</span>
      <bingo :type="type" :onBingo="options.instantCorrection ? 'true' : 'false'" @click="toggleOption('instantCorrection')"/>
    </div>

    <!-- 按钮区域 -->
    <div class="button-group">
      <Button :type="type === 'dark' ? 'dark' : 'light'" @click="handleCancel">取消</Button>
      <Button type="yellow" @click="handleConfirm">确定</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import Bingo from '@/components/bingo/bingo.vue';
import Button from '@/components/button/button.vue';

interface Props {
  type?: 'dark' | 'light';
  sectionNumber?: number;
  wordCount?: number;
  // 初始配置选项状态
  initialOptions?: {
    shuffle?: boolean;
    autoPlay?: boolean;
    showPhonetic?: boolean;
    includeStats?: boolean;
    instantCorrection?: boolean;
  };
}

// 默认值
const props = withDefaults(defineProps<Props>(), {
  type: 'dark',
  sectionNumber: 1,
  wordCount: 25,
  initialOptions: () => ({
    shuffle: true,
    autoPlay: true,
    showPhonetic: true,
    includeStats: true,
    instantCorrection: true
  })
});

// 创建本地状态
const options = ref({
  shuffle: props.initialOptions.shuffle,
  autoPlay: props.initialOptions.autoPlay,
  showPhonetic: props.initialOptions.showPhonetic,
  includeStats: props.initialOptions.includeStats,
  instantCorrection: props.initialOptions.instantCorrection
});

// 事件发射
const emit = defineEmits(['cancel', 'confirm', 'prev-section', 'next-section']);

// 切换选项
const toggleOption = (option: string) => {
  if (option === 'shuffle') options.value.shuffle = !options.value.shuffle;
  else if (option === 'autoPlay') options.value.autoPlay = !options.value.autoPlay;
  else if (option === 'showPhonetic') options.value.showPhonetic = !options.value.showPhonetic;
  else if (option === 'includeStats') options.value.includeStats = !options.value.includeStats;
  else if (option === 'instantCorrection') options.value.instantCorrection = !options.value.instantCorrection;
};

// 处理按钮点击
const handleCancel = () => {
  emit('cancel');
};

const handleConfirm = () => {
  emit('confirm', options.value);
};

// 处理上下节切换
const handlePrevSection = () => {
  emit('prev-section');
};

const handleNextSection = () => {
  emit('next-section');
};
</script>

<style scoped>
.option-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 409px;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-box);
  gap: 25px;
}

.dark {
  background-color: var(--color-theme-dark);
}

.light {
  background-color: var(--color-theme-light);
}

.section-title, .word-count, .option-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 10px;
}

.nav-arrow {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.section-text, .count-label, .option-label {
  font-family: var(--font-family-main);
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  line-height: 1.4;
  text-align: center;
}

.dark .section-text, .dark .count-label, .dark .option-label {
  color: var(--color-text-light);
}

.light .section-text, .light .count-label, .light .option-label {
  color: var(--color-text-dark);
}

.count-value {
  font-family: var(--font-family-main);
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-stat-text);
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 60px;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
}
</style>