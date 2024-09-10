<template>
  <div class="employee-list">
    <h1>Funcionários</h1>
    <button class="btn" @click="addEmployee">Adicionar Funcionário</button>
    <div v-if="showForm">
      <EmployeeForm :employee="currentEmployee" :isEdit="isEdit" @save="saveEmployee" @cancel="cancelEdit" />
    </div>
    <div v-if="employees.length">
      <div v-for="employee in employees" :key="employee.id" class="employee-item">
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
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm.vue";

export default {
  components: {
    EmployeeForm
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
        password: ""
      }
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3333/employee", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.employees = response.data;
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error.response?.data || error.message);
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
        password: ""
      };
    },
    editEmployee(employee) {
      this.showForm = true;
      this.isEdit = true;
      this.currentEmployee = { ...employee };
    },
    async saveEmployee(employee) {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Passando o token pelo cabeçalho
        };
        if (this.isEdit) {
          await axios.put(`http://localhost:3333/employee/${employee.id}`, employee, {
            headers,
          });

        } else {
          const response = await axios.post("http://localhost:3333/employee", employee, {headers});
          if (response.data.message === "Sem autorização") {
            console.error("Erro: Sem autorização para criar funcionário");
          } else {
            this.employees.push(response.data);
          }
            this.employees.push(response.data);

        }
        this.cancelEdit();
        this.fetchEmployees();
      } catch (error) {
        console.error("Erro ao salvar funcionário:", error);
      }
    },
    async deleteEmployee(id) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3333/employee/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Passando o token pelo cabeçalho
          },
        });
        this.fetchEmployees();
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
      }
    },
    cancelEdit() {
      this.showForm = false;
    }
  }
};
</script>

<style scoped>
.employee-list {
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
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn:hover {
  background-color: #0056b3;
}

.buttons {
  display: flex;
  gap: 10px;
}

.edit {
  background-color: #4caf50;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete {
  background-color: red;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
