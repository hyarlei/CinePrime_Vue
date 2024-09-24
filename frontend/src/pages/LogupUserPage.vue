<template>
  <div class="content">
    <div class="form-container">
      <form @submit.prevent="submitForm" novalidate>
        <h2>Cadastro de Usuário</h2>

        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="nome" required />
        </div>

        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="cpf" required />
        </div>

        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            v-model="telefone"
            @input="formatarTelefone"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="senha">Senha:</label>
          <input type="password" id="senha" v-model="senha" required />
        </div>

        <div class="form-group">
          <label for="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            v-model="confirmarSenha"
            required
          />
        </div>

        <button type="submit" :disabled="!todosPreenchidos">Enviar</button>

        <div v-if="mensagemErro" class="erro">{{ mensagemErro }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      mensagemErro: "",
    };
  },
  computed: {
    todosPreenchidos() {
      return (
        this.nome.trim() !== "" &&
        this.cpf.trim() !== "" &&
        this.telefone.trim() !== "" &&
        this.email.trim() !== "" &&
        this.senha.trim() !== "" &&
        this.confirmarSenha.trim() !== ""
      );
    },
  },
  methods: {
    validarSenhas() {
      if (this.senha !== this.confirmarSenha) {
        this.mensagemErro = "As senhas não correspondem.";
        return false;
      }
      this.mensagemErro = "";
      return true;
    },
    formatarTelefone() {
      let telefone = this.telefone.replace(/\D/g, "");
      if (telefone.length > 0) {
        telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
      }
      if (telefone.length > 9) {
        telefone = telefone.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
      }
      this.telefone = telefone;
    },
    async submitForm() {
      if (this.validarSenhas() && this.todosPreenchidos) {
        try {
          const userData = {
            nome: this.nome,
            cpf: this.cpf,
            telefone: this.telefone,
            email: this.email,
            password: this.senha,
          };

          const response = await axios.post(
            `${process.env.VUE_BACKEND_PORT}/user`,
            userData
          );

          if (response.status === 201) {
            alert("Usuário cadastrado com sucesso!");

            this.nome = "";
            this.cpf = "";
            this.telefone = "";
            this.email = "";
            this.senha = "";
            this.confirmarSenha = "";
            this.mensagemErro = "";

            this.$router.push("/login");
          } else {
            this.mensagemErro = "Erro ao cadastrar usuário.";
          }
        } catch (error) {
          console.error(
            "Erro na requisição:",
            error.response ? error.response.data : error
          );
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.mensagemErro = error.response.data.message;
          } else {
            this.mensagemErro =
              "Erro ao cadastrar usuário. Tente novamente mais tarde.";
          }
        }
      } else {
        if (!this.validarSenhas()) {
          alert("As senhas não correspondem.");
        } else {
          alert("Por favor, corrija os erros no formulário.");
        }
      }
    },
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  height: auto;
  min-height: calc(100% - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
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
