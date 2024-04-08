<template>
  <div id="app">
    <PageContainer>
      <!-- <CinePrimeNavbar /> -->
      <ContentContainer>
        <router-view />
      </ContentContainer>
    </PageContainer>
  </div>
</template>

<script>
import PageContainer from './components/PageContainer.vue';
import ContentContainer from './components/ContentContainer.vue';
// import CinePrimeNavbar from './components/CinePrimeNavbar.vue';

export default {
  name: 'App',
  components: {
    PageContainer,
    ContentContainer,
    // CinePrimeNavbar
  }
};
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
</style>
