<template>
  <div class="pageContainer">
    <slot name="navbar"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageContainer'
};
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
.pageContainer {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>