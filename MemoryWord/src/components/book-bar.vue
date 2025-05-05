<template>
  <div class="book-bar" :class="theme === 'light' ? 'book-bar-light' : 'book-bar-dark'">
    <div class="book-info">
      <div class="book-icon">
        <img :src="theme === 'light' ? VocIconDark : VocIconLight" class="book-icon" alt="导航图标" />
        
      </div>
      <span class="book-title">当前词书：{{ bookName }}</span>
    </div>
    <div class="book-change-icon" @click="handleChangeBook">
        <img :src="theme === 'light' ? AddIconDark : AddIconLight" class="book-icon" alt="导航图标" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import VocIconDark from '@/components/icons/base/dark/voc.svg'
import VocIconLight from '@/components/icons/base/light/voc.svg'
import AddIconDark from '@/components/icons/base/dark/add.svg'
import AddIconLight from '@/components/icons/base/light/add.svg'

const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (value: string) => ['dark', 'light'].includes(value)
  },
  bookName: {
    type: String,
    default: 'Get4'
  }
});

const emit = defineEmits(['change-book']);

const handleChangeBook = () => {
  emit('change-book');
};
</script>

<style scoped>
.book-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  padding: 10px;
  border-radius: var(--border-radius-small);
}

.book-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-medium);
}

.book-bar-dark .book-info {
  background-color: var(--color-theme-dark);
}

.book-bar-light .book-info {
  background-color: var(--color-theme-light);
}

.book-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
}

.book-title {
  font-family: var(--font-family-main);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-large);
  line-height: 1.4;
  text-align: center;
}

.book-bar-dark .book-title {
  color: var(--color-text-light);
}

.book-bar-light .book-title {
  color: var(--color-text-dark);
}

.book-change-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-small);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.book-change-icon:hover {
  transform: scale(1.1);
}
</style>
