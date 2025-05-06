<template>
    <div class="test-card" :class="{ 'light-theme': currentTheme === 'light' }">
        <div class="test-container">
            <!-- 卡片顶部：索引和单词 -->
            <div class="card-index">
                <IndexBar :currentIndex="currentIndex" :totalWords="totalWords" :currentTheme="currentTheme" />
            </div>
            <div class="display-content">
                <div class="word-container">
                <!-- 用户输入的单词 -->
                    <h1 class="user-word word">{{ word }}</h1>
                </div>
                <!-- 发音部分 -->
                <div class="pronunciation-section">
                    <div class="pronunciation-item">
                        <span class="phonetic">英{{ ukPhonetic }}</span>
                        <div class="sound-icon" @click="playUkPronunciation()">
                            <img 
                                :src="`src/components/icons/base/${currentTheme === 'dark' ? 'dark' : 'light'}/speaker.svg`"
                                alt="播放英式发音" 
                            />
                        </div>
                    </div>
                    <div class="pronunciation-item">
                        <span class="phonetic">美{{ usPhonetic }}</span>
                        <div class="sound-icon" @click="playUsPronunciation()">
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
            </div>
        </div>
        <!-- 功能按钮区 -->
        <div class="actions-section">
            <div class="action-definition-button" @click="getWordCue">
                <span class="action-text">按TAB显示释义</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import IndexBar from '@/components/index-bar.vue';
import { withDefaults, defineProps } from 'vue';
import { playUkPronunciation, playUsPronunciation } from '@/api/index.ts'; // 假设你有这个API来播放发音


interface Definition {
  pos: string;       // 词性
  definition: string; // 定义
}


interface Props {
  currentTheme?: 'dark' | 'light';  // 主题类型
  word?: string;            // 单词
  currentIndex?: number;    // 当前索引
  totalWords?: number;      // 总单词数
  ukPhonetic?: string;      // 英式音标
  usPhonetic?: string;      // 美式音标
  definitions?: Definition[]; // 词义列表
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
  ]
});

function getWordCue() {
    console.log('toggle favorite');
}

function summitTest() {
    console.log('submit test');
}
</script>

<style scoped>
.test-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 28px 49px;
    width: 615px;
    min-height: calc(100vh - 135px); /* Adjusted to account for top container */
    
    position: relative;
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

/* Add media query for responsive width */
@media screen and (max-width: 700px) {
    .test-card {
        width: 90%;
        min-height: auto;
        padding: 28px 20px;
    }
}


/* 卡片顶部：索引和单词 */
.card-index {
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

.display-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    width: 100%;
}

.test-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18vh;
    width: 100%;
    height: 100%;
}

.speaker-icon {
    cursor: pointer;
}

.user-word {
    color: var(--color-text-lightblue);
}

.light-theme .user-word {
    color: var(--color-text-green);
}

.correct-word {
    color: var(--color-background-green);
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
  cursor: pointer;
}


/* 功能按钮区 */
.actions-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: calc(100% - 98px);
    padding: 14px 7px;
    position: absolute;
    bottom: 28px;
    left: 49px;
}

.action-definition-button {
    background-color: var(--color-background-dark);
    padding: 7px;
    border-radius: 7px;
    box-shadow: var(--shadow-normal);
    cursor: pointer;
    width: 48%;
    transition: transform 0.3s, background-color 0.3s;
    text-align: center;
    color: var(--color-text-light);
}

.action-definition-button:hover {
    transform: scale(1.05);
}


.action-text {
    font-family: var(--font-family-main);
    font-size: 17px;
    font-weight: var(--font-weight-normal);
}

/* 词义部分 */
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

.definitions-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 7px;
}

.word-card .action-text {
    color: var(--color-text-lightblue);
}

.light-theme .action-text {
    color: var(--color-theme-dark);
    opacity: 0.85;
}

.light-theme .test-card {
    background-color: var(--color-theme-light);
    color: var(--color-text-green);
}

.light-theme .action-definition-button {
    background-color: var(--color-white);
}

.light-theme .user-word {
    color: var(--color-text-dark);
}
</style>