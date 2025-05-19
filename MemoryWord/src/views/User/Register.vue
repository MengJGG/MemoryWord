<template>
  <div class="login-card" :class="{ 'light-theme': currentTheme === 'light' }">
    <!-- 登录容器 -->
    <div class="login-container">
      <!-- 标题 -->
      <div class="card-title">
        <h1 class="title-text">注册</h1>
      </div>

      <!-- 用户名输入区 -->
      <div class="input-section">
        <div class="input-label" :class="{ 'error-label': errors.username }">
          用户名 {{ errors.username ? `(${errors.username})` : '' }}
        </div>
        <div class="input-field">
          <input type="text" v-model="username" :class="['input-box', { 'error-input': errors.username }]"
            placeholder="请输入用户名" />
        </div>
      </div>

      <!-- 邮箱输入区 -->
      <div class="input-section">
        <div class="input-label" :class="{ 'error-label': errors.email }">
          邮箱 {{ errors.email ? `(${errors.email})` : '' }}
        </div>
        <div class="input-field">
          <input type="email" v-model="email" :class="['input-box', { 'error-input': errors.email }]"
            placeholder="请输入邮箱" />
        </div>
      </div>

      <!-- 密码输入区 -->
      <div class="input-section">
        <div class="input-label" :class="{ 'error-label': errors.password }">
          密码 {{ errors.password ? `(${errors.password})` : '' }}
        </div>
        <div class="input-field">
          <input :type="showPassword ? 'text' : 'password'" v-model="password"
            :class="['input-box', { 'error-input': errors.password }]" placeholder="请输入密码" />
        </div>
      </div>

      <!-- 确认密码输入区 -->
      <div class="input-section">
        <div class="input-label" :class="{ 'error-label': errors.confirmPassword }">
          确认密码 {{ errors.confirmPassword ? `(${errors.confirmPassword})` : '' }}
        </div>
        <div class="input-field">
          <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword"
            :class="['input-box', { 'error-input': errors.confirmPassword }]" placeholder="请再次输入密码" />
        </div>
      </div>

      <!-- 注册按钮 -->
      <div class="login-button" @click="handleRegister">
        <span class="button-text">注册</span>
      </div>

      <!-- 底部链接 -->
      <div class="bottom-links">
        <div class="link-text" @click="goToLogin">返回登录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { registerNewUser } from './users';

interface Props {
  currentTheme?: 'dark' | 'light';
}

const props = withDefaults(defineProps<Props>(), {
  currentTheme: 'dark'
});

const router = useRouter();

// 响应式状态
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);

// 错误信息
const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 表单验证
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

// 验证函数
function validateForm() {
  let isValid = true;
  errors.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  if (username.value.length < 3) {
    errors.value.username = '用户名至少需要3个字符';
    isValid = false;
  }

  if (!isEmailValid.value) {
    errors.value.email = '请输入有效的邮箱地址';
    isValid = false;
  }

  // Check password length
  if (password.value.length < 6) {
    errors.value.password = '密码至少需要6个字符';
    isValid = false;
  }

  // Check for password complexity
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(password.value)) {
    errors.value.password = '密码必须包含大小写字母、数字和特殊字符';
    isValid = false;
  }

  // Check for common unsafe patterns
  const unsafePatterns = /(<script|javascript:|data:)/i;
  if (unsafePatterns.test(password.value)) {
    errors.value.password = '密码包含不安全字符';
    isValid = false;
  }

  // Check password confirmation
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = '两次输入的密码不一致';
    isValid = false;
  }

  return isValid;
}

// 切换密码可见性
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// 处理注册
async function handleRegister() {
  if (!validateForm()) {
    return;
  }

  try {
    // 创建 AES 密钥
    const key = crypto.getRandomValues(new Uint8Array(16));
    // 创建初始化向量
    const iv = crypto.getRandomValues(new Uint8Array(16));

    // 转换密钥和初始化向量为 CryptoKey
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      'AES-CBC',
      false,
      ['encrypt']
    );

    // 将密码转换为 Uint8Array
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password.value);

    // 加密密码
    const encryptedPassword = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: iv
      },
      cryptoKey,
      passwordData
    );

    // 将加密后的数据转换为 base64 字符串
    const encryptedBase64_password = btoa(String.fromCharCode(...new Uint8Array(encryptedPassword)));
    console.log('加密后的密码:', encryptedBase64_password);

    // 用户注册信息
    const userData = {
      username: username.value,
      encryptedPassword: encryptedBase64_password,
      email: email.value,
    };

    // 调用 API 提交注册信息
    // const response = await axios.post('@/views/User/users', userData);
    const response = await registerNewUser(userData);
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // 注册成功后跳转到登录页
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('注册失败');
  }
}

// 页面跳转
function goToLogin() {
  router.push({ name: 'Login' });
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
  width: 100%;
}

.title-text {
  color: var(--color-text-light);
  font-size: var(--font-size-xl);
  font-family: var(--font-family-main);
  font-weight: var(--font-weight-bold);
  width: 100%;
}

.light-theme .title-text {
  color: var(--color-text-dark);
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
  width: 100%;
}

.input-label {
  color: var(--color-text-light);
  font-size: var(--font-size-small);
  font-family: var(--font-family-main);
  font-weight: var(--font-weight-normal);
  width: 100%;
}

.light-theme .input-label {
  color: var(--color-text-dark);
}

.input-field {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

input {
  text-align: center;
  width: 100%;
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
  width: 100%;
}

.login-button {
  height: 48px;
  width: 100%;
  margin-top: 3vh;
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
  width: 100%;
  text-align: center;
  user-select: none;
}

.light-theme .button-text {
  color: var(--color-theme-dark);
  opacity: 0.85;
}

.bottom-links {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-small);
  width: 100%;
}

.link-text {
  color: var(--color-text-light);
  font-size: var(--font-size-small);
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-normal);
  cursor: pointer;
  transition: opacity 0.3s;
  width: 100%;
  text-align: center;
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

.error-message {
  color: var(--color-background-red);
  font-size: var(--font-size-small);
  margin-top: 4px;
  text-align: left;
}

.input-box.error {
  border: 1px solid var(--color-background-red);
}

.error-label {
  color: var(--color-background-red) !important;
}

.error-input {
  border: 1px solid var(--color-background-red);
}
</style>
