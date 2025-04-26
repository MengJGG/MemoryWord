<template>
  <div class="home-container" :class="{ 'light-mode': appTheme === 'light' }">
    <div class="content-section">
      <h1 class="welcome-title">Welcome to Memory Word</h1>
      <!-- 导航栏和词书栏组件 -->
      <NavBar :theme="appTheme" @nav-change="handleNavChange" />
      <div class="book-bar-container">
        <BookBar :theme="appTheme" :bookName="currentBook" @change-book="handleChangeBook" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import BookBar from '@/components/book-bar/book-bar.vue';

// 主题状态管理
const appTheme = ref('dark'); // 默认使用暗色主题

// 当前词书
const currentBook = ref('Get4');

// 切换应用主题
const switchAppTheme = () => {
  appTheme.value = appTheme.value === 'dark' ? 'light' : 'dark';
};

// 处理功能栏操作
const handleFunctionAction = (action: string) => {
  // 处理不同功能按钮的点击事件
  switch (action) {
    case 'lamp':
      switchAppTheme(); // 切换主题
      break;
    case 'home':
      // 首页相关操作
      console.log('首页操作');
      break;
    case 'setting':
      // 设置相关操作
      console.log('设置操作');
      break;
    case 'personal':
      // 用户相关操作
      console.log('用户操作');
      break;
    default:
      console.log('未知操作:', action);
  }
};

// 处理导航栏选项变化
const handleNavChange = (index: number) => {
  console.log('导航切换到:', index);
};

// 处理更换词书
const handleChangeBook = () => {
  console.log('打开词书选择');
};
</script>

<style scoped>
.home-container {
  max-height: 80vh;
  background-color: var(--color-background-dark);
  color: var(--color-text-light);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  /* 左右留白 */
  padding: 0 20px;
  gap: 200px;
}

.light-mode {
  background-color: var(--color-theme-light);
  color: var(--color-text-dark);
}

.content-section {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 200px;
}

.welcome-title {
  font-family: var(--font-family-main);
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 30px;
  text-align: center;
}

.book-bar-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}


</style>
