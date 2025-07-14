<script setup>
import RegisterForm from './components/users/RegisterForm.vue';
import LoginForm from './components/users/LoginForm.vue';
import Todo from './components/ui/Todo.vue';

import { ref } from 'vue';

const show = 'login';

const token = localStorage.getItem('auo-demo-todo');
if (token) {
  show.value = 'todo';
}
</script>

<template>
  <Todo v-if="show == 'todo'" />
  <RegisterForm v-if="show == 'register'" @go_login="show = 'login'" />
  <LoginForm v-if="show == 'login'" @go_register="show = 'register'" />
</template>
