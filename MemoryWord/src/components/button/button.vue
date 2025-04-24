<template>
  <button 
    class="btn" 
    :class="[
      `btn-${type}`,
      { 'disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'dark' | 'light' | 'green' | 'red' | 'yellow'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'dark',
  disabled: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent): void => {
  emit('click', event)
}
</script>

<style scoped>
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: var(--border-radius-small);
  font-family: var(--font-family-main);
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  line-height: 1.4;
  text-align: center;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-normal);
  transition: opacity 0.3s;
}

.btn-dark {
  background-color: var(--color-background-dark);
  color: var(--color-text-light);
}

.btn-light {
  background-color: var(--color-theme-light);
  color: var(--color-text-dark);
}

.btn-green {
  background-color: var(--color-background-green);
  color: var(--color-text-light);
}

.btn-red {
  background-color: var(--color-background-red);
  color: var(--color-text-light);
}

.btn-yellow {
  background-color: var(--color-button-yellow);
  color: var(--color-text-light);
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
