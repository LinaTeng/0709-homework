<script setup>
import { ref,computed } from 'vue';
import axios from 'axios';

const email = ref('');
const nickname = ref('');
const password = ref('');
const canlogin = computed(() => {
  return eamil.value != '' && password.value != '';
});

const emits = defineEmits(['go_login']);

const register = async () => {
  if (email.value != '' && nickname.value != '' && password.value != '') {
    // 打 API

    const formData = {
      user: {
        email: email.value,
        nickname: nickname.value,
        password: password.value,
      },
    };

    try {
      await axios.post('https://todoo.5xcamp.us/users', formData);
      alert('註冊成功');
      goLogin();
    } catch (err) {
      const message = err.response.data.message;
      alert(message);
    }
  }
};

const goLogin = () => {
  // ....做別的事..
  emits('go_login');
};
</script>

<template>
  <section class="container mx-auto">
    <form class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label class="label">Email</label>
        <input v-model.trim="email" type="email" class="input" />
      </div>

      <div class="flex flex-col">
        <label class="label">暱稱</label>
        <input v-model="nickname" type="text" class="input" />
      </div>

      <div class="flex flex-col">
        <label class="label">密碼</label>
        <input v-model.trim="password" type="password" class="input" />
      </div>

      <div>
        <button @click.prevent="register" class="btn">註冊</button>
      </div>
      <span> 已經有帳號了？<a @click.prevent="goLogin" href="#">登入</a> </span>
    </form>
  </section>
</template>
