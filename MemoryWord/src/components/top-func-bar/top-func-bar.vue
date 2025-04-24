<template>
  <div class="top-func-bar" :class="[type]">
    <div class="func-left-item">
        <div class="func-item theme-toggle" @click="handleAction('lamp')" :title="type === 'dark' ? '切换到亮色主题' : '切换到暗色主题'">
            <img v-if="type === 'dark'" src="../icons/base/light/lamp.svg" alt="切换主题" />
            <img v-else src="../icons/base/dark/lamp.svg" alt="切换主题" />
        </div>
    </div>
    
    <div class="func-right-group">
      <div class="func-right-item">
        <div class="func-item" @click="handleAction('setting')">
          <img v-if="type === 'dark'" src="../icons/base/light/setting.svg" alt="设置" />
          <img v-else src="../icons/base/dark/setting.svg" alt="设置" />
        </div>
      </div>

      <div class="func-right-item">
        <div class="func-item" @click="handleAction('home')">
          <img v-if="type === 'dark'" src="../icons/base/light/home.svg" alt="首页" />
          <img v-else src="../icons/base/dark/home.svg" alt="首页" />
        </div>
      </div>

      <div class="func-right-item">
        <div class="func-item" @click="handleAction('personal')">
          <img v-if="type === 'dark'" src="../icons/base/light/personal.svg" alt="用户" />
          <img v-else src="../icons/base/dark/personal.svg" alt="用户" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  type?: 'dark' | 'light';
}

// 默认值设置
const props = withDefaults(defineProps<Props>(), {
  type: 'dark'
});

// 定义事件
const emit = defineEmits(['action']);

// 处理点击事件
const handleAction = (action: 'lamp' | 'setting' | 'home' | 'personal') => {
  emit('action', action);
};
</script>

<style scoped>
.top-func-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  width: 100%;
}

.func-left-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: auto;
}

.func-right-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.func-right-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
}

.func-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  border-radius: 75px;
  cursor: pointer;
  box-shadow: var(--shadow-normal);
  transition: transform 0.2s, box-shadow 0.3s;
  user-select: none;
}

.theme-toggle {
  position: relative;
  overflow: hidden;
}

.theme-toggle::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 75px;
  opacity: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  transition: opacity 0.3s;
}

.dark .theme-toggle::after {
  opacity: 0.3;
}

.func-item:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-medium);
}

.func-item:active {
  transform: scale(0.95);
}

/* 暗色主题样式 */
.dark .func-item {
  background-color: var(--color-background-dark);
}

/* 亮色主题样式 */
.light .func-item {
  background-color: var(--color-white);
}

img {
  width: 36px;
  height: 36px;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
}
</style>
