<template>
    <div class="user-container" :class="{ 'light-theme': currentTheme === 'light' }">
        <h1 class="title-text">还没登录？</h1>
        <div class="cue-container">
            <a @click="goToLogin" class="link-text">
                点击这里
            </a>
            <span class="normal-text">进行登录，或者</span>
            <a @click="goToRegister" class="link-text">进行注册</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

interface Props {
  currentTheme?: 'dark' | 'light';
}

const props = withDefaults(defineProps<Props>(), {
  currentTheme: 'dark'
});

const router = useRouter();

function goToLogin() {
    router.push('/login');
}

function goToRegister() {
    router.push('/register');
}
</script>

<style scoped>
.user-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    transition: all 0.3s ease;
}

.title-text {
    color: var(--color-text-light);
    font-size: var(--font-size-xl);
    font-family: var(--font-family-main);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-medium);
    user-select: none;
    cursor: default;
}

.cue-container {
    display: flex;
    gap: var(--spacing-small);
    align-items: center;
}

.normal-text {
    color: var(--color-text-light);
    font-size: var(--font-size-medium);
    font-family: var(--font-family-main);
    user-select: none;
    cursor: default;
}

.link-text {
    color: var(--color-text-lightblue);
    font-size: var(--font-size-medium);
    font-family: var(--font-family-main);
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.link-text:hover {
    opacity: 0.8;
    text-decoration: underline;
}

/* 亮色主题样式 */
.light-theme .title-text,
.light-theme .normal-text {
    color: var(--color-text-dark);
}

.light-theme .link-text {
    color: #0070cc;
}
</style>