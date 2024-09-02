<template>
    <button :class="buttonClass" @click="handleClick" :type="type" :style="style">
      {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      variant: {
        type: String,
        default: "primary" // Defina um valor padrão para a variante, se necessário
      },
      onClick: Function,
      type: {
        type: String,
        default: "button" // Defina um valor padrão para o tipo, se necessário
      },
      style: Object,
      text: String
    },
    computed: {
      buttonClass() {
        return "btn btn-" + this.variant;
      }
    },
    methods: {
      handleClick() {
        if (typeof this.onClick === "function") {
          this.onClick();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais para o botão podem ser adicionados aqui */
  </style>
  