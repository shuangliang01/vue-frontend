<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  background-color: rgba(43, 43, 43, 0.9);
  padding: 1rem 0;
}
nav a {
  color: white;
  font-size: 18px;
  padding: 0 3rem;
  text-decoration: none;
}
</style>
