<script setup lang="ts">
import Home from './views/Home.vue'
import './assets/base.css'
</script>

<template>
  <Home />
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
</style>
