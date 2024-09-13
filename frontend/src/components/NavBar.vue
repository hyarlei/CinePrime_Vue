<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">
        <img src="../assets/logo.png" alt="Logo" />
      </router-link>
    </div>
    <ul class="navbar-links">
      <li v-if="userRole === 'adm'">
        <router-link class="link" to="/funcionarios">Funcionários</router-link>
      </li>
      <li><router-link class="link" to="/filmes">Filmes</router-link></li>
      <li v-if="userRole === 'adm' || userRole === 'employee'">
        <router-link class="link" to="/salas">Salas</router-link>
      </li>
      <li v-if="userRole === 'adm' || userRole === 'employee'">
        <router-link class="link" to="/sessoes">Sessões</router-link>
      </li>
    </ul>
    <button @click="toggleAuth" class="btn-login">{{ isAuthenticated ? 'Logout' : 'Login' }}</button>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["userRole", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    toggleAuth() {
      if (this.isAuthenticated) {
        this.logout();
        this.$router.push('/login');
      } else {
        this.$router.push('/login');
      }
    },
  },
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
  gap: 64px;
}

.navbar-links li {
  margin-left: 0;
}

.navbar-links .link {
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s;
}

.navbar-links li[data-v-4295d220] {
  margin: 0;
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
