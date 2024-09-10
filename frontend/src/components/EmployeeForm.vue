<template>
  <div class="employee-form">
    <label for="nome">Nome</label>
    <input v-model="formEmployee.nome" id="nome" type="text" required />

    <label for="cpf">CPF</label>
    <input v-model="formEmployee.cpf" id="cpf" type="text" required />

    <label for="telefone">Telefone</label>
    <input v-model="formEmployee.telefone" id="telefone" type="text" required />

    <label for="email">Email</label>
    <input v-model="formEmployee.email" id="email" type="email" required />

    <label for="password">Senha</label>
    <input v-model="formEmployee.password" id="password" type="password" required />

    <div class="buttons">
      <button class="save" @click.prevent="saveEmployee">Salvar</button>
      <button class="cancel" @click.prevent="cancel">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: Object,
    isEdit: Boolean
  },
  data() {
    return {
      formEmployee: { ...this.employee }
    };
  },
  methods: {
    saveEmployee() {
      this.$emit("save", this.formEmployee);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
.employee-form {
  display: flex;
  flex-direction: column;
}
label {
  margin: 10px 0 5px;
}
input {
  padding: 8px;
  margin-bottom: 10px;
}
.buttons {
  display: flex;
  gap: 10px;
}
.save {
  background-color: #4caf50;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel {
  background-color: #f44336;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
