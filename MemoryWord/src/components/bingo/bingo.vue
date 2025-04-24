<template>
  <div class="bingo-container" :class="[type]">
    <div class="bingo-option">
      <div class="bingo-frame"></div>
      <img 
        v-if="onBingo === 'true'" 
        src="../components-option-icons/bingo-icon.svg" 
        class="bingo-icon" 
        alt="Bingo" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义组件接收的props
interface Props {
  // 组件变体，可以是'dark'或'light'
  type?: 'dark' | 'light';
  // 是否显示bingo图标
  onBingo?: 'true' | 'false';
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  type: 'dark',
  onBingo: 'false'
});
</script>

<style scoped>
.bingo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bingo-option {
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.bingo-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

/* 暗色主题 */
.dark .bingo-frame {
  background-color: var(--color-theme-gray);
  box-shadow: var(--shadow-inset);
}

/* 亮色主题 */
.light .bingo-frame {
  background-color: var(--color-theme-light);
  box-shadow: var(--shadow-inset-light);
}

.bingo-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 1;
}
</style>
