<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { getToken } from '@/utils/token';

axios.defaults.headers.common['Authorization'] = getToken();

const todoInput = ref('');

const addTodo = async () => {
  const content = todoInput.value;

  if (content != '') {
    const formData = {
      todo: {
        content: content,
      },
    };
    try {
      const { data } = await axios.post(
        'https://todoo.5xcamp.us/todos',
        formData
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<template>
  <section class="container mx-auto">
    <h1 class="text-2xl">今天你想做些什麼事...</h1>
    <div class="my-2">
      <input type="text" v-model.trim="todoInput" class="input" />
      <button @click="addTodo" class="btn">新增</button>
    </div>
  </section>
</template>
