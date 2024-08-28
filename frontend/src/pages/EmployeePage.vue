<template>
  <div class="employee-list">
    <h1>Funcionários</h1>
    <button class="btn" @click="addEmployee">Adicionar Novo Funcionário</button>

    <div v-if="showForm">
      <EmployeeForm
        :employee="currentEmployee"
        :isEdit="isEdit"
        @save="saveEmployee"
        @cancel="cancelEdit"
      />
    </div>

    <div v-if="employees.length">
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="employee-item"
      >
        <p><strong>Nome:</strong> {{ employee.nome }}</p>
        <p><strong>Email:</strong> {{ employee.email }}</p>
        <p><strong>CPF:</strong> {{ employee.cpf }}</p>
        <p><strong>Telefone:</strong> {{ employee.telefone }}</p>
        <div class="buttons">
          <button class="edit" @click="editEmployee(employee)">Editar</button>
          <button class="delete" @click="deleteEmployee(employee.id)">
            Excluir
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Não há funcionários cadastrados.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm.vue";

export default {
  components: {
    EmployeeForm,
  },
  data() {
    return {
      employees: [],
      showForm: false,
      isEdit: false,
      currentEmployee: {
        id: null,
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        password: "",
      },
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:3333/employees");
        this.employees = response.data;
      } catch (error) {
        console.error(
          "Erro ao buscar funcionários:",
          error.response ? error.response.data : error.message
        );
      }
    },
    addEmployee() {
      this.showForm = true;
      this.isEdit = false;
      this.currentEmployee = {
        id: null,
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        password: "",
      };
    },
    editEmployee(employee) {
      this.showForm = true;
      this.isEdit = true;
      this.currentEmployee = { ...employee };
    },
    async saveEmployee(employee) {
      try {
        if (this.isEdit) {
          const response = await axios.put(
            `http://localhost:3333/employees/${employee.id}`,
            employee
          );
          const index = this.employees.findIndex((e) => e.id === employee.id);
          this.$set(this.employees, index, response.data);
        } else {
          const response = await axios.post(
            "http://localhost:3333/employees",
            employee
          );
          this.employees.push(response.data);
        }
        this.showForm = false;
        this.resetCurrentEmployee();
      } catch (error) {
        console.error(
          "Erro ao salvar funcionário:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async deleteEmployee(employeeId) {
      try {
        await axios.delete(`http://localhost:3333/employees/${employeeId}`);
        this.employees = this.employees.filter(
          (employee) => employee.id !== employeeId
        );
      } catch (error) {
        console.error(
          "Erro ao excluir funcionário:",
          error.response ? error.response.data : error.message
        );
      }
    },
    cancelEdit() {
      this.showForm = false;
      this.resetCurrentEmployee();
    },
    resetCurrentEmployee() {
      this.currentEmployee = {
        id: null,
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        password: "",
      };
    },
  },
  created() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
.employee-list {
  height: calc(100% - 180px);
  padding: 20px;
}
.employee-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 16px;
}

.btn:hover {
  background-color: #0056b3;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
}

.edit {
  background-color: #4caf50;
  width: 72px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.delete {
  background-color: red;
  width: 72px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>
