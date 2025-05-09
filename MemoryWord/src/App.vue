<script setup lang="ts">
import Home from './views/Home.vue'
import Learn from './views/Learn.vue'
import Option from './views/Option.vue'
import TopFuncBar from './components/top-func-bar.vue'
import './assets/base.css'
import {RouterLink, RouterView} from 'vue-router'
import { ref } from 'vue'

const currentTheme = ref<string>('dark')  // 默认主题为暗色



function toggleTheme(newTheme: string) {
  // 保存到cookie
  document.cookie = `theme=${newTheme}; path=/`;
  currentTheme.value = newTheme
}


function loadThemeFromCookie() {
  // 从cookie中获取主题
  const theme = document.cookie.split('; ').find(row => row.startsWith('theme='));
  if (theme) {
    const themeValue = theme.split('=')[1];
    currentTheme.value = themeValue === 'dark' ? 'dark' : 'light';
  } else {
    // 如果没有设置cookie，则使用默认主题
    currentTheme.value = 'dark';
  }
}

loadThemeFromCookie();
console.log("App.vue加载")
</script>

<template>
  <div class="main-container" :class="currentTheme">  
    <TopFuncBar @theme-change="toggleTheme"></TopFuncBar>
    <router-view :currentTheme="currentTheme"></router-view>
    <!-- <Home></Home> -->
    <!-- <Option></Option> -->
    <!-- <Learn type="dark"></Learn> -->
  </div>  
</template>

<style>
/* 只保留全局重置和基础样式 */
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family-main);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  
  padding: 34px 70px;
  gap: 0px;
  box-sizing: border-box;
}

.dark {
  background-color: var(--color-theme-dark);
  color: var(--color-text-light);
}

.light {
  background-color: var(--color-theme-light);
  color: var(--color-text-dark);
}

* {
  transition: background-color 0.3s ease;
}

</style>
