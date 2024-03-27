<template>
  <button :class="variant" @click="onClick" :type="type" :style="style">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    variant: String,
    onClick: Function,
    type: String,
    style: Object,
    text: String
  }
};
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
</style>
