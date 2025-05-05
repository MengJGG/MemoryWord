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
  currentTheme.value = newTheme
}


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
  padding: 34px 70px;
  gap: 0px;
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
