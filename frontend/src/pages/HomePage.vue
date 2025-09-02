<template>
  <div class="home">
    <h1>Bem vindo ao Cine Prime</h1>
    <h2>A melhor plataforma de gerenciamento de cinemas da região!</h2>
    <div>
      <button @click="handleSubmit">Sobre a equipe Cine Prime</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    handleSubmit() {
      alert(
        `Hyarlei Silva Freitas - 542646`
      );
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 180px);
}
</style>
