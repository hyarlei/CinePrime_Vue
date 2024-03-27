<template>
  <button :class="props.variant" @click="props.onClick" :type="props.type" :style="props.style">
    {{ props.text }}
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
