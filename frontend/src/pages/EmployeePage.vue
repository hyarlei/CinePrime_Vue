<template>
  <div class="employee-page">
    <h1>Funcionários</h1>
    <button class="btn" @click="addEmployee">Adicionar Novo Funcionário</button>

    <div v-if="showForm">
      <form @submit.prevent="saveEmployee">
        <input v-model="formEmployee.nome" placeholder="Nome" required />
        <input v-model="formEmployee.email" placeholder="Email" required />
        <input v-model="formEmployee.cpf" placeholder="CPF" required />
        <input v-model="formEmployee.telefone" placeholder="Telefone" required />
        <input v-model="formEmployee.password" placeholder="Senha" required type="password" />
        <button type="submit">{{ editMode ? 'Atualizar' : 'Salvar' }}</button>
        <button type="button" @click="cancelEdit">Cancelar</button>
      </form>
    </div>

    <EmployeeComponent
      v-for="employee in employees"
      :key="employee.id"
      :employee="employee"
      @edit-employee="editEmployee"
      @delete-employee="deleteEmployee"
    />
  </div>
</template>

<script>
import axios from 'axios';
import EmployeeComponent from '../components/EmployeeComponent.vue';

export default {
  components: {
    EmployeeComponent,
  },
  data() {
    return {
      employees: [],
      showForm: false,
      editMode: false,
      formEmployee: {
        id: null,
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        password: '',
      },
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const token = localStorage.getItem('token'); // Obtém o token de autenticação
        const response = await axios.get('http://localhost:3333/employees', {
          headers: {
            'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
          }
        });
        this.employees = response.data;
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error.response ? error.response.data : error.message);
      }
    },
    addEmployee() {
      this.showForm = true;
      this.editMode = false;
      this.formEmployee = {
        id: null,
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        password: '',
      };
    },
    editEmployee(employee) {
      this.showForm = true;
      this.editMode = true;
      this.formEmployee = { ...employee };
    },
    async saveEmployee() {
      try {
        const token = localStorage.getItem('token'); // Obtém o token de autenticação
        if (this.editMode) {
          const response = await axios.put(`http://localhost:3333/employees/${this.formEmployee.id}`, this.formEmployee, {
            headers: {
              'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
            }
          });
          const index = this.employees.findIndex((e) => e.id === this.formEmployee.id);
          this.$set(this.employees, index, response.data);
        } else {
          const response = await axios.post('http://localhost:3333/employees', this.formEmployee, {
            headers: {
              'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
            }
          });
          this.employees.push(response.data);
        }
        this.showForm = false;
        this.formEmployee = { id: null, nome: '', email: '', cpf: '', telefone: '', password: '' };
      } catch (error) {
        console.error('Erro ao salvar funcionário:', error.response ? error.response.data : error.message);
      }
    },
    async deleteEmployee(employeeId) {
      try {
        const token = localStorage.getItem('token'); // Obtém o token de autenticação
        await axios.delete(`http://localhost:3333/employees/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
          }
        });
        this.employees = this.employees.filter((employee) => employee.id !== employeeId);
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error.response ? error.response.data : error.message);
      }
    },
    cancelEdit() {
      this.showForm = false;
      this.formEmployee = {
        id: null,
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        password: '',
      };
    },
  },
  created() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
.employee-page {
  padding: 20px;
}

.employee-page button {
  margin-bottom: 20px;
}

.employee-page form {
  margin-bottom: 20px;
}

.employee-page input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
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
</style>
