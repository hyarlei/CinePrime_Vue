<template>
  <div class="form-group mb-3" :id="id">
    <label>{{ label }}</label>
    <input class="form-control" :placeholder="placeholder" :type="type" :value="value"
      @input="onChange($event.target.value)" />
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
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: bold;
}

.form-group .form-control {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

/* Estilos opcionais podem ser adicionados aqui */
</style>
