<template>
  <div class="home-container" :class="currentTheme">
    <div class="content-section">
      <h1 class="welcome-title" :class="{ 'dark-text': currentTheme === 'light', 'light-text': currentTheme === 'dark' }">Welcome to Memory Word</h1>
      <!-- 导航栏和词书栏组件 -->
      <NavBar :theme="currentTheme" @nav-change="handleNavChange" />
      <div class="book-bar-container">
        <BookBar :theme="currentTheme" :bookName="currentBook" @change-book="handleChangeBook" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import NavBar from '@/components/nav-bar.vue';
import BookBar from '@/components/book-bar.vue';

interface Props {
  currentTheme?: 'dark' | 'light';
}

const props = withDefaults(defineProps<Props>(), {
  currentTheme: 'dark'
});

const router = useRouter()

// 当前词书
const currentBook = ref('Get4');

// 处理功能栏操作
const handleFunctionAction = (action: string) => {
  // 处理不同功能按钮的点击事件
  switch (action) {
    case 'lamp':
      // 主题切换现在由TopFuncBar组件处理
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
  switch(index) {
    case 0:
      router.push({
        name: 'Learn'
      })
      break
    case 1:
      router.push({
        name: 'Option',
      }) 
      break
    case 2:
      router.push({
        name: 'Memory',
      })  
      break
    case 3:
      router.push({
        name: 'Test',
      }) 
      break
    case 4:
      router.push({
        name: 'Typing',
      })  
      break
    default:
      router.push('/')
  }
};

// 处理更换词书
const handleChangeBook = () => {
  console.log('打开词书选择');
};
</script>

<style scoped>
.home-container {
  max-height: 70vh;
  color: var(--color-text-light);
  display: flex;
  flex-direction: column;
  /* 左右留白 */
  padding: 0 20px;
  background-color: transparent;
}

.content-section {
  flex: 1;
  padding: 20px;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
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



.dark-text {
  color: var(--color-text-dark);
}

.light-text {
  color: var(--color-text-light);
}

</style>
