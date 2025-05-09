<template>
  <div class="pronunciation-section">
    <div class="pronunciation-item" v-if="!isTest">
    <span class="phonetic">英{{ ukPhonetic }}</span>
    <div class="sound-icon" @click="playPronunciation(word, '1')">
      <img 
      :src="`src/components/icons/base/${currentTheme === 'dark' ? 'dark' : 'light'}/speaker.svg`"
      alt="播放英式发音"  
      />
    </div>
    </div>
    <div class="pronunciation-item">
    <span class="phonetic" v-if="!isTest">美{{ usPhonetic }}</span>
    <div class="sound-icon" @click="playPronunciation(word, '2')">
      <img 
      :src="`src/components/icons/base/${currentTheme === 'dark' ? 'dark' : 'light'}/speaker.svg`"
      alt="播放美式发音" 
      />
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { playPronunciation } from '@/api/index.ts';
import { withDefaults, defineProps } from 'vue';

interface Props {
  currentTheme?: 'dark' | 'light';  // 主题类型
  word?: string;            // 单词
  ukPhonetic?: string;      // 英式音标
  usPhonetic?: string;      // 美式音标
  isTest?: boolean;      // 是否是测试模式
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  currentTheme: 'dark',
  word: 'vocabulary',
  ukPhonetic: '/vəkæbjələri/',
  usPhonetic: '/vəˈkæbjəleri/',
  isTest: false
});

</script>

<style scoped>
@import '../assets/main.css';
/* 发音部分 */
.pronunciation-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 26px;
  padding: 6px 22px;
  width: 100%;
}

.pronunciation-item {
  display: flex;
  align-items: center;
  gap: 13px;
}

.phonetic {
  font-family: var(--font-family-main);
  font-size: 15px;
  font-weight: 500;
}

.sound-icon {
  cursor: pointer;
  width: 17px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>