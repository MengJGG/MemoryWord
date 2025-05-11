<template>
  <div class="login-card" :class="{ 'light-theme': currentTheme === 'light' }">
    <!-- 登录容器 -->
    <div class="login-container">
      <!-- 标题 -->
      <div class="card-title">
        <h1 class="title-text">登录</h1>
      </div>
      
      <!-- 用户名/邮箱输入区 -->
      <div class="input-section">
        <div class="input-label">用户名/邮箱</div>
        <div class="input-field">
          <input type="text" v-model="username" class="input-box" placeholder="请输入用户名/邮箱"/>
        </div>
      </div>
      
      <!-- 密码输入区 -->
      <div class="input-section">
        <div class="input-label">密码</div>
        <div class="input-field">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" class="input-box" placeholder="请输入密码"/>
          
        </div>
      </div>
      
      <!-- 空白间隔 -->
      <div class="spacer"></div>
      
      <!-- 登录按钮 -->
      <div class="login-button" @click="handleLogin">
        <span class="button-text">登录</span>
      </div>
      
      <!-- 底部链接 -->
      <div class="bottom-links">
        <div class="link-text" @click="goToRegister">注册账号</div>
        <div class="link-text" @click="goToForgotPassword">忘记密码</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  currentTheme?: 'dark' | 'light';
}

// 定义props，设置默认值
const props = withDefaults(defineProps<Props>(), {
  currentTheme: 'dark'
});

const router = useRouter();

// 响应式状态
const username = ref('');
const password = ref('');
const showPassword = ref(false);

// 切换密码可见性
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// 处理登录
function handleLogin() {
  console.log('登录操作', username.value, password.value);
  // TODO: 实现登录逻辑
}

// 页面跳转
function goToRegister() {
  router.push('/register');
}

function goToForgotPassword() {
  router.push('/forgot-password');
}
</script>

<style scoped>
.login-card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    transition: all 0.3s ease;
}

.login-container {
  min-width: 400px;
  min-height: 600px;
  padding: 40px;
  background: var(--color-theme-dark);
  border-radius: var(--border-radius-large);
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-medium);
  box-shadow: var(--shadow-box);
  transition: all 0.3s ease;
}

.light-theme .login-container {
  background-color: var(--color-theme-light);
}

.card-title {
  text-align: center;
}

.title-text {
  color: var(--color-text-light);
  font-size: var(--font-size-xl);
  font-family: var(--font-family-main);
  font-weight: var(--font-weight-bold);
}

.light-theme .title-text {
  color: var(--color-text-dark);
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}

.input-label {
  color: var(--color-text-light);
  font-size: var(--font-size-small);
  font-family: var(--font-family-main);
  font-weight: var(--font-weight-normal);
}

.light-theme .input-label {
  color: var(--color-text-dark);
}

.input-field {
  position: relative;
  display: flex;
  align-items: center;
}

input {
    text-align: center;
}

.input-box {
  width: 100%;
  padding: var(--spacing-small) var(--spacing-small);
  background: var(--color-input-bg);
  border: none;
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-medium);
  font-family: var(--font-family-main);
  color: var(--color-input-text);
  outline: none;
  transition: all 0.3s ease;
}

.light-theme .input-box {
  background: var(--color-white);
}

.eye-icon {
  position: absolute;
  right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.spacer {
  height: 12.5px;
}

.login-button {
  height: 48px;
  background: var(--color-background-dark);
  border-radius: var(--border-radius-small);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-normal);
}

.light-theme .login-button {
  background: var(--color-button-yellow);
}

.login-button:hover {
  transform: scale(1.02);
}

.button-text {
  color: var(--color-text-light);
  font-size: var(--font-size-medium);
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-normal);
  user-select: none;
}

.light-theme .button-text {
  color: var(--color-theme-dark);
  opacity: 0.85;
}

.bottom-links {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: var(--spacing-small);
}

.link-text {
  color: var(--color-text-light);
  font-size: var(--font-size-small);
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-normal);
  cursor: pointer;
  transition: opacity 0.3s;
}

.light-theme .link-text {
  color: var(--color-text-dark);
}

.link-text:hover {
  opacity: 0.8;
}

@media screen and (max-width: 500px) {
  .login-container {
    width: 90%;
    padding: var(--spacing-medium);
  }
  
  .title-text {
    font-size: var(--font-size-large);
  }
}
</style>
