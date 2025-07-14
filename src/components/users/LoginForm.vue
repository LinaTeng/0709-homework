<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
const emits = defineEmits(['go_register']);

const STORAGE_KEY="auo-demo-todo";

const email = ref('');
const password = ref('');
const canlogin = computed(() => {
  return email.value != '' && password.value != '';
});

const login = async () => {
  const formData = {
    user: {
      email: email.value,
      password: password.value,
    },
  };

  try {
    const resp = await axios.post(
      'https://todoo.5xcamp.us/users/sign_in',
      formData
    );
    const token = resp.headers.authorization;
    localStorage.setItem(STORAGE_KEY,);
    // 存
  } catch (err) {
    const message = err.response.data.message;
    alert(message);
    clear();
  }
};

const clear = () => {
  (email.value = ''), (password.value = '');
};
</script>

<template>
  <section class="container mx-auto">
    <form class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label class="label">Email</label>
        <input type="email" class="input" />
      </div>

      <div class="flex flex-col">
        <label class="label">密碼</label>
        <input type="password" class="input" />
      </div>

      <div>
        <button @click.prevent="login" :disable="!canlogin" class="btn">
          登入
        </button>
      </div>
      <span
        >還沒有帳號嗎？<a @click.prevent="goRegister" href="#">註冊</a
        >一個吧</span
      >
    </form>
  </section>
</template>
