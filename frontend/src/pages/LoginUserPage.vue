<template>
  <div class="content">
    <div class="form-container">
      <form @submit.prevent="submitForm" novalidate>
        <h2>Login</h2>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="senha">Senha:</label>
          <input type="password" id="senha" v-model="senha" required />
        </div>
        <button type="submit" :disabled="!todosPreenchidos">Entrar</button>
        <div v-if="mensagemErro" class="erro">{{ mensagemErro }}</div>
      </form>
      <span
        >Não possui cadastro? Registre-se
        <routerLink class="link" to="/cadastro">aqui</routerLink></span
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: "",
      senha: "",
      mensagemErro: "",
    };
  },
  computed: {
    todosPreenchidos() {
      return this.email.trim() !== "" && this.senha.trim() !== "";
    },
  },
  methods: {
    async submitForm() {
      if (this.todosPreenchidos) {
        try {
          const response = await axios.post('http://localhost:3333/auth', {
            email: this.email,
            password: this.senha,
          });

          const token = response.data.token;

          // Armazena o token em localStorage para usá-lo nas requisições futuras
          localStorage.setItem('token', token);

          // Redireciona o usuário para a página principal ou painel
          this.$router.push('/');

        } catch (error) {
          this.mensagemErro = "Falha no login: " + (error.response?.data.message || error.message);
        }
      } else {
        this.mensagemErro = "Por favor, preencha todos os campos.";
      }
    },
  },
};
</script>


<style scoped>
.content {
  width: 100%;
  height: calc(100% - 180px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 16px;
}
.link {
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  transition: color 0.3s;
}

.link:hover{
    color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.erro {
  color: red;
  margin-top: 10px;
}
</style>
