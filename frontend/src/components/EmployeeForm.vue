<template>
  <div class="employee-form">
    <h2>{{ isEdit ? "Editar Funcionário" : "Adicionar Funcionário" }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nome">Nome:</label>
        <input v-model="localEmployee.nome" type="text" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="localEmployee.email" type="email" required />
      </div>
      <div>
        <label for="cpf">CPF:</label>
        <input v-model="localEmployee.cpf" placeholder="CPF" required />
      </div>
      <div>
        <label for="telefone">Telefone:</label>
        <input
          v-model="localEmployee.telefone"
          @input="formatarTelefone"
          type="text"
          id="telefone"
          required
        />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input v-model="localEmployee.password" type="password" required />
      </div>
      <button type="submit">{{ isEdit ? "Atualizar" : "Salvar" }}</button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      default: () => ({
        id: null,
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        password: "",
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localEmployee: { ...this.employee },
    };
  },
  watch: {
    employee: {
      handler(newEmployee) {
        this.localEmployee = { ...newEmployee };
      },
      deep: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit("save", this.localEmployee);
    },
    formatarTelefone() {
      let telefone = this.localEmployee.telefone.replace(/\D/g, "");
      if (telefone.length > 0) {
        telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
      }
      if (telefone.length > 9) {
        telefone = telefone.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
      }
      this.localEmployee.telefone = telefone;
    },
  },
};
</script>

<style scoped>
.employee-form {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
}
form div {
  margin-bottom: 12px;
}
button {
  margin-right: 8px;
}
</style>
