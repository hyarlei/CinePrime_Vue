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
        <span>Não possui cadastro? Registre-se <router-link class="link" to="/cadastro">aqui</router-link></span>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../apiClient'; // Importa o axios configurado
  
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
        try {
          const response = await apiClient.post('/auth/login', {
            email: this.email,
            password: this.senha,
          });
  
          const token = response.data.token; // Assumindo que o token é retornado no campo `token`
          localStorage.setItem('token', token); // Armazena o token no localStorage
  
          this.$router.push('/funcionarios'); // Redireciona para a página de funcionários após login bem-sucedido
        } catch (error) {
          this.mensagemErro = "Erro ao fazer login. Verifique suas credenciais.";
          console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Seu estilo aqui */
  </style>
  