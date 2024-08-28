<template>
  <div class="employee">
    <h2>{{ employee.nome }}</h2>
    <p><strong>Email:</strong> {{ employee.email }}</p>
    <p><strong>CPF:</strong> {{ employee.cpf }}</p>
    <p><strong>Telefone:</strong> {{ employee.telefone }}</p>
    <div class="buttons">
      <button class="edit" @click="$emit('edit-employee', employee)">Editar</button>
      <button class="delete" @click="$emit('delete-employee', employee.id)">Excluir</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.employee {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
}

.employee button {
  width: 72px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.edit {
  background-color: #4caf50;
}

.delete {
  background-color: red;
}
</style>
