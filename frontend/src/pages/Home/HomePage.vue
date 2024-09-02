<template>
  <div>
    <h1>Bem vindo ao Cine Prime</h1>
    <p>A melhor plataforma de gerenciamento de cinemas da região!</p>

    <Button variant="success" text="Sobre a equipe Cine Prime" @click="handleSubmit" />
  </div>
</template>

<script>
import Button from '@/components/CustomButton.vue';

export default {
  components: {
    Button
  },
  methods: {
    handleSubmit() {
      alert(`Hyarlei Silva Freitas - 542646\nAntonio Victor Cavalcante Rodrigues - 535739`);
    }
  }
};
</script>

<style scoped>
/* Seus estilos personalizados */
</style>