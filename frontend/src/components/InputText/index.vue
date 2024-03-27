<template>
  <div class="form-group mb-3" :id="props.id">
    <label>{{ props.label }}</label>
    <input class="form-control" :placeholder="props.placeholder" :type="props.type" :value="props.value"
      @input="props.onChange($event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    placeholder: String,
    type: String,
    value: [String, Number],
    onChange: Function
  }
};
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
.form-group {
  /* Estilos CSS da classe .form-group */
}
</style>
