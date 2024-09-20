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

    <div v-if="isAuthenticated" class="dropdown">
      <button class="dropdown-toggle" @click="toggleDropdown">
        <span class="material-symbols-outlined"> account_circle </span>
        Olá, {{ getFirstName(userName) }}
      </button>
      <div v-if="dropdownVisible" class="dropdown-menu">
        <router-link class="dropdown-item" to="/minhas-compras"
          >Minhas Compras</router-link
        >
        <button class="dropdown-item" @click="logoutUser">
          <span class="material-symbols-outlined"> logout </span>
        </button>
      </div>
    </div>

    <button v-else @click="login" class="btn-login">Login</button>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      dropdownVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userRole", "isAuthenticated", "userName"]),
  },
  methods: {
    ...mapActions(["logout"]),

    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },

    login() {
      this.$router.push("/login");
    },

    logoutUser() {
      this.logout();
      this.$router.push("/login");
      this.dropdownVisible = false;
    },

    getFirstName(fullName) {
      return fullName.split(" ")[0];
    },

    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  watch: {
    $route() {
      this.dropdownVisible = false;
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

.navbar-links .link {
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s;
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

.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  min-width: 150px;
  padding: 10px 0;
}

.dropdown-item {
  padding: 10px 15px;
  text-align: left;
  text-decoration: none;
  background-color: white;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
}

.dropdown-item:hover {
  background-color: #f2f2f2;
}
</style>
