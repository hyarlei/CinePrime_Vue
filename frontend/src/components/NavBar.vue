<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/"
        ><img src="../assets/logo.png" alt="Logo"
      /></router-link>
    </div>
    <ul class="navbar-links">
      <li>
        <router-link class="link" to="/funcionarios">Funcionários</router-link>
      </li>
      <li><router-link class="link" to="/filmes">Filmes</router-link></li>
      <li><router-link class="link" to="/salas">Salas</router-link></li>
      <li><router-link class="link" to="/sessoes">Sessões</router-link></li>
      <li><button @click="login" class="btn-login">Login</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
  methods: {
    login() {
      console.log("Botão de login clicado!");
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 10px 20px;
  margin-bottom: 50px;
}

.navbar-logo img {
  height: 50px;
}

.navbar-links {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-links .link {
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s;
}

.navbar-links li {
  margin-left: 20px;
}

.navbar-links .link:hover {
  color: #ddd;
}

.btn-login {
  width: 80px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
}

.btn-login:hover {
  background-color: #0056b3;
}
</style>
