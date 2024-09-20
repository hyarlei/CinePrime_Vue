<template>
  <div class="employee-list">
    <h1>Funcionários</h1>
    <button class="btn" @click="addEmployee">Adicionar Funcionário</button>
    <div v-if="showForm">
      <EmployeeForm
        :employee="currentEmployee"
        :isEdit="isEdit"
        @save="saveEmployee"
        @cancel="cancelEdit"
      />
      <!-- Exibe a mensagem de erro -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
    <div v-if="employees.length">
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="employee-item"
      >
        <p><strong>Nome:</strong> {{ employee.nome }}</p>
        <p><strong>CPF:</strong> {{ employee.cpf }}</p>
        <p><strong>Telefone:</strong> {{ employee.telefone }}</p>
        <p><strong>Email:</strong> {{ employee.email }}</p>
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
import employeeService from "../service/employeeService";
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
        cpf: "",
        telefone: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const employeesData = await employeeService.fetchEmployees();
        this.employees = Array.isArray(employeesData) ? employeesData : [];
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    },

    addEmployee() {
      this.showForm = true;
      this.isEdit = false;
      this.currentEmployee = {
        id: null,
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        password: "",
      };
      this.errorMessage = "";
    },

    editEmployee(employee) {
      this.showForm = true;
      this.isEdit = true;
      this.currentEmployee = { ...employee };
      this.errorMessage = "";

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    async saveEmployee(employee) {
      try {
        if (this.isEdit) {
          await employeeService.editEmployee(employee.id, employee);
        } else {
          const newEmployee = await employeeService.addEmployee(employee);
          this.employees.push(newEmployee);
        }
        this.cancelEdit();
        await this.fetchEmployees();
      } catch (error) {
        if (error.response && error.response.data.message === "CPF já existe") {
          this.errorMessage = "Erro: O CPF informado já existe no sistema.";
        } else {
          console.error("Erro ao salvar funcionário:", error);
          this.errorMessage = "Erro ao salvar funcionário. Tente novamente.";
        }
      }
    },

    async deleteEmployee(id) {
      try {
        await employeeService.deleteEmployee(id);
        this.fetchEmployees();
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
      }
    },

    cancelEdit() {
      this.showForm = false;
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
.employee-list {
  padding: 20px;
  min-height: 100%;
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

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
