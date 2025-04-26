<script setup lang="ts">
import Home from './views/Home.vue'
import Learn from './views/learn.vue'
import Option from './views/Option.vue'
import TopFuncBar from './components/top-func-bar/top-func-bar.vue'
import './assets/base.css'
import {RouterLink, RouterView} from 'vue-router'


</script>

<template>
  <div class="main-container" style="background-color: var(--color-background-dark);">
    <TopFuncBar></TopFuncBar>
    <!-- <Home></Home> -->
    <!-- <Option></Option> -->
    <Learn type="dark"></Learn>
  </div>  
</template>

<style>
/* 只保留全局重置和基础样式 */
body {
  margin: 0;
  padding: 0;
  background-color: var(--color-background-dark);
  font-family: var(--font-family-main);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 70px;
  gap: 200px;
}

</style>
