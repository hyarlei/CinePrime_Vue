<template>
  <div class="home">
    <h1>Bem vindo ao Cine Prime</h1>
    <p>A melhor plataforma de gerenciamento de cinemas da região!</p>

    <button @click="handleSubmit">Sobre a equipe Cine Prime</button>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    handleSubmit() {
      alert(
        `Hyarlei Silva Freitas - 542646\nAntonio Victor Cavalcante Rodrigues - 535739`
      );
    },
  },
};
</script>

<style scoped>
.home {
  height: calc(100% - 180px) ;
}
</style>
