<template>
  <div>
    <h1>Registering user</h1>
    <p>ID : {{ id }}</p>
    <p>Username: {{ username }}</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const { id, username } = route.query;

const params = { id, username };


signUp(params);

function signUp(params) {
  
  console.log('Registering user:', params);
}
</script>