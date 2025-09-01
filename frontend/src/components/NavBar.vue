<template>
  <nav class="navbar">
    <!-- Logo com link para a página inicial -->
    <div class="navbar-logo">
      <router-link to="/">
        <img src="../assets/logo.png" alt="Logo CinePrime" />
      </router-link>
    </div>
    
    <!-- Links de navegação com permissões baseadas no papel do usuário -->
    <ul class="navbar-links">
      <!-- Link para gerenciar funcionários (somente administradores) -->
      <li v-if="userRole === 'adm'">
        <router-link class="link" to="/funcionarios">Funcionários</router-link>
      </li>
      
      <!-- Link para visualizar filmes (todos os usuários) -->
      <li>
        <router-link class="link" to="/filmes">Filmes</router-link>
      </li>
      
      <!-- Links para gerenciar salas e sessões (administradores e funcionários) -->
      <li v-if="isStaff">
        <router-link class="link" to="/salas">Salas</router-link>
      </li>
      <li v-if="isStaff">
        <router-link class="link" to="/sessoes">Sessões</router-link>
      </li>
    </ul>

    <!-- Menu do usuário quando autenticado -->
    <div v-if="isAuthenticated" class="dropdown">
      <button class="dropdown-toggle" @click="toggleDropdown" aria-label="Menu do usuário">
        <span class="material-symbols-outlined">account_circle</span>
        Olá, {{ getFirstName(userName) }}
      </button>
      
      <!-- Dropdown menu com opções do usuário -->
      <div v-if="dropdownVisible" class="dropdown-menu">
        <router-link class="dropdown-item" to="/minhas-compras">
          <span class="material-symbols-outlined">shopping_bag</span>
          Minhas Compras
        </router-link>
        <button class="dropdown-item" @click="logoutUser" aria-label="Sair">
          <span class="material-symbols-outlined">logout</span>
          Sair
        </button>
      </div>
    </div>

    <!-- Botão de login para usuários não autenticados -->
    <button v-else @click="login" class="btn-login">Login</button>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

/**
 * @component NavBar
 * @description Componente de barra de navegação responsiva que exibe links e opções
 * de acordo com o status de autenticação e papel do usuário.
 */

export default {
  name: "NavBar",
  
  data() {
    return {
      dropdownVisible: false,
    };
  },
  
  computed: {
    ...mapGetters(["userRole", "isAuthenticated", "userName"]),
    
    /**
     * Verifica se o usuário é parte da equipe do cinema (administrador ou funcionário)
     * @returns {boolean} - Verdadeiro se for administrador ou funcionário
     */
    isStaff() {
      return this.userRole === 'adm' || this.userRole === 'employee';
    }
  },
  
  
  methods: {
    ...mapActions(["logout"]),

    /**
     * Alterna a visibilidade do dropdown de usuário
     */
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    
    /**
     * Fecha o dropdown
     */
    closeDropdown() {
      this.dropdownVisible = false;
    },

    /**
     * Redireciona para a página de login
     */
    login() {
      this.$router.push("/login");
    },

    /**
     * Realiza o logout do usuário e redireciona para a página de login
     */
    logoutUser() {
      this.logout();
      this.$router.push("/login");
      this.dropdownVisible = false;
    },

    /**
     * Extrai o primeiro nome do nome completo do usuário
     * @param {string} fullName - Nome completo do usuário
     * @returns {string} - Primeiro nome do usuário
     */
    getFirstName(fullName) {
      if (!fullName) return '';
      return fullName.split(" ")[0];
    },

    /**
     * Manipula cliques fora do componente para fechar o dropdown
     * @param {Event} event - Evento de clique
     */
    handleOutsideClick(event) {
      if (this.$el && !this.$el.contains(event.target)) {
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
