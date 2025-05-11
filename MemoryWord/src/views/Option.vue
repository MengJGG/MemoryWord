<template>
    <div class="option-bar" :class="[currentTheme]">
        <!-- 标题区域：节号 -->
        <div class="section-title">
            <img src="@/components/components-option-icons/prev-icon-light.svg" alt="上一节" class="nav-arrow prev-arrow"
                v-if="currentTheme === 'dark'" @click="handlePrevSection">
            <img src="@/components/components-option-icons/prev-icon-dark.svg" alt="上一节" class="nav-arrow prev-arrow" v-else
                @click="handlePrevSection">
            <span class="section-text">第 {{ sectionNumber }} 节</span>
            <img src="@/components/components-option-icons/next-icon-light.svg" alt="下一节" class="nav-arrow next-arrow"
                v-if="currentTheme === 'dark'" @click="handleNextSection">
            <img src="@/components/components-option-icons/next-icon-dark.svg" alt="下一节" class="nav-arrow next-arrow" v-else
                @click="handleNextSection">
        </div>

        <!-- 词数统计 -->
        <div class="word-count">
            <span class="count-label">总词数：</span>
            <span class="count-value">{{ wordCount }}</span>
        </div>

        <!-- 选项区域 -->
        <div class="option-item">
            <span class="option-label">自动打乱：</span>
            <bingo :type="currentTheme" :onBingo="options.shuffle ? 'true' : 'false'" @click="toggleOption('shuffle')" />
        </div>

        <div class="option-item">
            <span class="option-label">自动发音：</span>
            <bingo :type="currentTheme" :onBingo="options.autoPlay ? 'true' : 'false'" @click="toggleOption('autoPlay')" />
        </div>

        <div class="option-item">
            <span class="option-label">显示音标：</span>
            <bingo :type="currentTheme" :onBingo="options.showPhonetic ? 'true' : 'false'"
                @click="toggleOption('showPhonetic')" />
        </div>

        <div class="option-item">
            <span class="option-label">纳入统计：</span>
            <bingo :type="currentTheme" :onBingo="options.includeStats ? 'true' : 'false'"
                @click="toggleOption('includeStats')" />
        </div>

        <div class="option-item">
            <span class="option-label">立刻纠错：</span>
            <bingo :type="currentTheme" :onBingo="options.instantCorrection ? 'true' : 'false'"
                @click="toggleOption('instantCorrection')" />
        </div>

        <!-- 按钮区域 -->
        <div class="button-group">
            <Button :type="currentTheme === 'dark' ? 'light' : 'dark'" @click="handleCancel">取消</Button>
            <Button type="yellow" @click="handleConfirm">确定</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import Bingo from '@/components/bingo/bingo.vue';
import Button from '@/components/button/button.vue';

interface Props {
    from: 'Learn' | 'Memory' | 'Typing' | 'Test';
    currentTheme?: 'dark' | 'light';
    sectionNumber?: number;
    wordCount?: number;
    // 初始配置选项状态
    initialOptions?: {
        shuffle?: boolean;  // 是否自动打乱
        autoPlay?: boolean;  // 是否自动发音
        showPhonetic?: boolean;  // 是否显示音标
        includeStats?: boolean;  // 是否纳入统计
        instantCorrection?: boolean;  // 是否立刻纠错
    };
}

// 默认值
const props = withDefaults(defineProps<Props>(), {
    from: 'Learn',
    currentTheme: 'dark',
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

const router = useRouter()

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
    router.push('/')  // TODO
    emit('cancel');
};

// 确认按钮点击
const handleConfirm = () => {
    router.replace({ path: '/Test', query: { options: toRaw(JSON.stringify(options.value)) } })  // TODO
    //emit('confirm', options.value);
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

.section-title,
.word-count,
.option-item {
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

.section-text,
.count-label,
.option-label {
    font-family: var(--font-family-main);
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    line-height: 1.4;
    text-align: center;
}

.dark .section-text,
.dark .count-label,
.dark .option-label {
    color: var(--color-text-light);
}

.light .section-text,
.light .count-label,
.light .option-label {
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

.button-group button:hover {
    transform: scale(1.05);
}

.option-bar {
    transition: background-color 0.3s ease;
}

.nav-arrow {
    transition: transform 0.3s ease;
}

.nav-arrow:hover {
    transform: scale(1.1);
}

.option-item {
    transition: opacity 0.3s ease;
}

.button-group button {
    transition: all 0.15s ease;
}

</style>