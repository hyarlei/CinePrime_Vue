<template>
  <div class="content_container" style="overflow: auto;">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentContainer'
};
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
.content_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5%;
  margin: 0% 0 0 0;
  width: 100%;
  height: 100%;
}
</style>