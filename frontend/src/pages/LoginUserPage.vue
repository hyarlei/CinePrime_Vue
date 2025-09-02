<template>
  <div class="content">
    <div class="form-container">
      <form @submit.prevent="submitForm" novalidate>
        <h2>Login</h2>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group senha-group">
          <label for="senha">Senha:</label>
          <input
            :type="mostrarSenha ? 'text' : 'password'"
            id="senha"
            v-model="senha"
            required
          />
          <button
            type="button"
            class="mostrar-senha"
            @click="toggleMostrarSenha"
          >
            <span class="material-symbols-outlined">
              {{ mostrarSenha ? "visibility_off" : "visibility" }}
            </span>
          </button>
        </div>
        <button type="submit" :disabled="!todosPreenchidos">Entrar</button>
        <div v-if="mensagemErro" class="erro">{{ mensagemErro }}</div>
      </form>
      <span>
        Não possui cadastro? Registre-se
        <router-link class="link" to="/cadastro">aqui</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      senha: "",
      mensagemErro: "",
      mostrarSenha: false,
    };
  },
  computed: {
    todosPreenchidos() {
      return this.email.trim() !== "" && this.senha.trim() !== "";
    },
  },
  methods: {
    toggleMostrarSenha() {
      this.mostrarSenha = !this.mostrarSenha;
    },
    async submitForm() {
      if (this.todosPreenchidos) {
        try {
          await this.login({ email: this.email, password: this.senha });
          this.$router.push("/");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              this.mensagemErro = "E-mail ou senha incorretos.";
            } else if (error.response.status === 404) {
              this.mensagemErro = "Usuário não encontrado.";
            } else {
              this.mensagemErro =
                "Falha no login: " +
                (error.response.data.message || error.message);
            }
          } else {
            this.mensagemErro = "Erro de conexão. Tente novamente.";
          }
        }
      } else {
        this.mensagemErro = "Por favor, preencha todos os campos.";
      }
    },
    ...mapActions(["login"]),
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
  width: 340px;
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
.senha-group {
  position: relative;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.mostrar-senha {
  width: auto;
  position: absolute;
  left: 256px;
  top: 74%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #333333;
  cursor: pointer;
}

.mostrar-senha:hover {
  color: #0056b3;
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

.link:hover {
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
