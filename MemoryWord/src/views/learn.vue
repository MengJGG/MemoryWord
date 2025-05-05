<template>
  <div class="word-card" :class="{ 'light-theme': currentTheme === 'light' }">
    <!-- 卡片顶部：索引和单词 -->
    <div class="card-header">
      <IndexBar :currentIndex="currentIndex" :totalWords="totalWords" :currentTheme="currentTheme" />
      <h1 class="word">{{ word }}</h1>
    </div>

    <!-- 发音部分 -->
    <div class="pronunciation-section">
      <div class="pronunciation-item">
        <span class="phonetic">英{{ ukPhonetic }}</span>
        <div class="sound-icon" @click="playUkPronunciation">
          <img 
            :src="`src/components/icons/base/${currentTheme === 'dark' ? 'dark' : 'light'}/speaker.svg`"
            alt="播放英式发音" 
          />
        </div>
      </div>
      <div class="pronunciation-item">
        <span class="phonetic">美{{ usPhonetic }}</span>
        <div class="sound-icon" @click="playUsPronunciation">
          <img 
            :src="`src/components/icons/base/${currentTheme === 'dark' ? 'dark' : 'light'}/speaker.svg`"
            alt="播放美式发音" 
          />
        </div>
      </div>
    </div>

    <!-- 词义部分 -->
    <div class="definitions-section">
      <div class="definition-item" v-for="(def, index) in definitions" :key="index">
        <span class="part-of-speech">{{ def.pos }}</span>
        <span class="definition-text">{{ def.definition }}</span>
      </div>
    </div>

    <!-- 例句部分 -->
    <div class="examples-section">
      <div class="section-title">[例句]</div>
      <div class="example-list">
        <div class="example-item" v-for="(example, index) in examples" :key="index">
          <div class="example-text">{{ example.english }}</div>
          <div class="example-text">{{ example.chinese }}</div>
        </div>
      </div>
    </div>

    <!-- 短语部分 -->
    <div class="phrases-section" v-if="phrases.length > 0">
      <div class="section-title">[短语]</div>
      <div class="phrase-list">
        <div class="phrase-item" v-for="(phrase, index) in phrases" :key="index">
          <div class="phrase-text">{{ index + 1 }}、{{ phrase.english }}</div>
          <div class="phrase-text">{{ phrase.chinese }}</div>
        </div>
      </div>
    </div>

    <!-- 同类词部分 -->
    <div class="similar-words-section" v-if="similarWords.length > 0">
      <div class="section-title">[同类词]</div>
      <div class="similar-words-list">
        <div class="similar-word-item" v-for="(word, index) in similarWords" :key="index">
          <div class="similar-word-text">{{ index + 1 }}、{{ word.english }}</div>
          <div class="similar-word-text">{{ word.chinese }}</div>
        </div>
      </div>
    </div>

    <!-- 功能按钮区 -->
    <div class="actions-section">
      <div class="action-button" @click="toggleFavorite">
        <img 
          :src="`src/components/icons/base/${currentTheme === 'dark' ? 'light' : 'dark'}/star.svg`"
          alt="收藏" 
        />
        <span class="action-text">收藏</span>
      </div>
      <div class="action-button" @click="searchWord">
        <img 
          :src="`src/components/icons/base/${currentTheme === 'dark' ? 'light' : 'dark'}/internet.svg`"
          alt="搜索" 
        />
        <span class="action-text">单词搜索</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import IndexBar from '@/components/index-bar.vue'

interface Definition {
  pos: string;       // 词性
  definition: string; // 定义
}

interface Example {
  english: string;   // 英文例句
  chinese: string;   // 中文翻译
}

interface Phrase {
  english: string;   // 英文短语
  chinese: string;   // 中文翻译
}

interface Props {
  currentTheme?: 'dark' | 'light';  // 主题类型
  word?: string;            // 单词
  currentIndex?: number;    // 当前索引
  totalWords?: number;      // 总单词数
  ukPhonetic?: string;      // 英式音标
  usPhonetic?: string;      // 美式音标
  definitions?: Definition[]; // 词义列表
  examples?: Example[];     // 例句列表
  phrases?: Phrase[];       // 短语列表
  similarWords?: Phrase[];  // 同类词列表
  isFavorite?: boolean;     // 是否收藏
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  currentTheme: 'dark',
  word: 'vocabulary',
  currentIndex: 1,
  totalWords: 25,
  ukPhonetic: '/vəkæbjələri/',
  usPhonetic: '/vəˈkæbjəleri/',
  definitions: () => [
    { pos: 'n.', definition: '词汇；术语' },
    { pos: 'adj.', definition: '词汇；术语' }
  ],
  examples: () => [
    { 
      english: 'Reading will enlarge your vocabulary.', 
      chinese: '阅读能扩大词汇量。'
    },
    { 
      english: 'Each computer language has its own syntax and vocabulary.', 
      chinese: '每种计算机语言都有自己的语法和词汇。'
    }
  ],
  phrases: () => [
    { 
      english: 'appropriate to', 
      chinese: '适合的；恰当的；适于'
    },
    { 
      english: 'appropriate for', 
      chinese: '合适；赞成；正式批准'
    }
  ],
  similarWords: () => [
    { 
      english: 'appropriator', 
      chinese: '占用者；擅用者'
    }
  ],
  isFavorite: false
});

// 是否收藏
const isFavorite = ref(props.isFavorite);

// 播放英式发音
const playUkPronunciation = () => {
  // 实际应用中可能会调用音频API播放发音
  console.log('播放英式发音：', props.word);
};

// 播放美式发音
const playUsPronunciation = () => {
  // 实际应用中可能会调用音频API播放发音
  console.log('播放美式发音：', props.word);
};

// 切换收藏状态
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  console.log(isFavorite.value ? '已收藏' : '取消收藏', props.word);
};

// 搜索单词
const searchWord = () => {
  console.log('搜索单词：', props.word);
};
</script>

<style scoped>
.word-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24.5px;
  padding: 28px 49px;
  width: 615px;
  border-radius: 21px;
  background-color: var(--color-theme-dark);
  box-shadow: var(--shadow-box);
  color: var(--color-text-light);
  transition: all 0.3s ease;
  margin: 0 auto;
}

.light-theme {
  background-color: var(--color-theme-light);
  color: var(--color-text-dark);
}

/* 卡片顶部：索引和单词 */
.card-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.word {
  font-family: var(--font-family-secondary);
  font-size: calc(var(--font-size-xl) * 0.8);
  font-weight: var(--font-weight-extra-bold);
  text-align: center;
  margin-top: 7px;
}

.word-card .word {
  color: var(--color-text-lightblue);
}

.light-theme .word {
  color: var(--color-text-green);
  opacity: 0.85;
}

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

/* 例句部分 */
.examples-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}

.section-title {
  font-family: var(--font-family-main);
  font-size: 17px;
  font-weight: var(--font-weight-normal);
}

.example-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 14px;
}

.example-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 7px;
  width: 100%;
}

.example-text {
  font-family: var(--font-family-secondary);
  font-size: 17px;
  font-weight: var(--font-weight-normal);
}

/* 短语部分 */
.phrases-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}

.phrase-list {
  width: 100%;
}

.phrase-item {
  margin-bottom: 7px;
}

.phrase-text {
  font-family: var(--font-family-main);
  font-size: 17px;
  font-weight: var(--font-weight-normal);
}

/* 同类词部分 */
.similar-words-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  padding: 9px 0;
}

.similar-words-list {
  width: 100%;
}

.similar-word-item {
  margin-bottom: 7px;
}

.similar-word-text {
  font-family: var(--font-family-main);
  font-size: 17px;
  font-weight: var(--font-weight-normal);
}

/* 功能按钮区 */
.actions-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  gap: 3.5px;
  padding: 7px;
}

.action-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10.5px;
  padding: 7px;
  border-radius: 7px;
  box-shadow: var(--shadow-normal);
  cursor: pointer;
  width: 48%;
  transition: transform 0.2s;
}

.action-button:hover {
  transform: scale(1.05);
}

.action-button img {
  width: 17px;
  height: 17px;
}

.action-text {
  font-family: var(--font-family-main);
  font-size: 17px;
  font-weight: var(--font-weight-normal);
}

.word-card .action-text {
  color: var(--color-text-lightblue);
}

.light-theme .action-text {
  color: var(--color-theme-dark);
  opacity: 0.85;
}
</style>
