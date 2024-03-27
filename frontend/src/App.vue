<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

// import Home from './views/Home.vue';

</script>

<template>
  <header>
    <!-- <Home /> tentando importar page Home --> 
    <nav>
      <RouterLink to="/home">Home</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>