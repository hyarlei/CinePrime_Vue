<template>
  <div id="app">
    <img alt="CinePrime logo" src="./assets/logo2.png">
    <!-- Adicione o componente HomePage ao template -->
    <HomePage />
  </div>
</template>

<script>
import HomePage from './pages/Home/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>