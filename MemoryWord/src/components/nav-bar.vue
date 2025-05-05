<template>
  <nav class="nav-bar">
    <div 
      v-for="(item, index) in navItems" 
      :key="index" 
      class="nav-item"
      :class="[
        { 'nav-item-active': activeIndex === index },
        theme === 'light' ? 'nav-item-light' : 'nav-item-dark'
      ]"
      @click="handleNavClick(index)"
    >
      <img :src="getIconPath(index)" class="nav-icon" alt="导航图标" />
      <span class="nav-text" :class="{ 'text-dark': theme === 'light' }">{{ item.text }}</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
// 亮色主题图标
import learnIconLight from '@/components/icons/base/dark/learn.svg';
import reviewIconLight from '@/components/icons/base/dark/review.svg';
import memoryIconLight from '@/components/icons/base/dark/memory.svg';
import wrongIconLight from '@/components/icons/base/dark/wrong.svg';
import typingIconLight from '@/components/icons/base/dark/typing.svg';
// 暗色主题图标
import learnIconDark from '@/components/icons/base/light/learn.svg';
import reviewIconDark from '@/components/icons/base/light/review.svg';
import memoryIconDark from '@/components/icons/base/light/memory.svg';
import wrongIconDark from '@/components/icons/base/light/wrong.svg';
import typingIconDark from '@/components/icons/base/light/typing.svg';

const props = defineProps({
  initialActive: {
    type: Number,
    default: 0
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (value: string) => ['dark', 'light'].includes(value)
  }
});

const emit = defineEmits(['nav-change']);

const activeIndex = ref(props.initialActive);

const navItems = [
  { text: '单词初记' },
  { text: '复习测试' },
  { text: '词义回想' },
  { text: '错词测试' },
  { text: '打字练习' }
];

const getIconPath = (index: number) => {
  if (props.theme === 'light') {
    switch(index) {
      case 0: return learnIconLight;
      case 1: return reviewIconLight;
      case 2: return memoryIconLight;
      case 3: return wrongIconLight;
      case 4: return typingIconLight;
      default: return learnIconLight;
    }
  } else {
    switch(index) {
      case 0: return learnIconDark;
      case 1: return reviewIconDark;
      case 2: return memoryIconDark;
      case 3: return wrongIconDark;
      case 4: return typingIconDark;
      default: return learnIconDark;
    }
  }
};

const handleNavClick = (index: number) => {
  activeIndex.value = index;
  emit('nav-change', index);
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 29px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 58px 31px;
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-large);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav-item-dark {
  background-color: var(--color-theme-dark);
}

.nav-item-light {
  background-color: var(--color-theme-light);
}

.nav-item:hover {
  transform: translateY(-5px);
}

.nav-item-active {
  box-shadow: var(--shadow-medium);
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.nav-text {
  font-family: var(--font-family-main);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-large);
  line-height: 1.4;
  color: var(--color-text-light);
  text-align: center;
}

.text-dark {
  color: var(--color-text-dark);
}
</style>
