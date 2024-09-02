<template>
    <b-navbar variant="dark">
      <b-container fluid>
        <div class="d-flex align-items-center">
          <router-link class="navbar-brand mb-3" to="/" @click="handleLogoClick">
            <img
              src="/assets/images/logo2.png"
              alt="CinePrime Logo"
              style="max-width: 100%; max-height: 80px"
            />
          </router-link>
        </div>
  
        <div class="d-flex justify-content-center align-items-center w-100">
          <div class="d-flex align-items-center">
            <router-link
              v-if="user && isAdmin"
              class="nav-link mx-2"
              :class="{ active: activeLink === 'funcionarios' }"
              to="/funcionario/list"
              @click="handleLinkClick('funcionarios')"
            >
              Funcionários
            </router-link>
  
            <router-link
              v-if="user && user.profile === 'employee'"
              class="nav-link mx-2"
              :class="{ active: activeLink === 'filmes' }"
              to="/filme/list"
              @click="handleLinkClick('filmes')"
            >
              Filmes
            </router-link>
  
            <router-link
              v-if="user && user.profile === 'employee'"
              class="nav-link mx-2"
              :class="{ active: activeLink === 'salas' }"
              to="/sala/list"
              @click="handleLinkClick('salas')"
            >
              Salas
            </router-link>
  
            <router-link
              v-if="user && user.profile === 'employee'"
              class="nav-link mx-2"
              :class="{ active: activeLink === 'sessoes' }"
              style="margin-right: 20px"
              to="/sessoes/list"
              @click="handleLinkClick('sessoes')"
            >
              Sessões
            </router-link>
          </div>
        </div>
  
        <div class="d-flex align-items-center">
          <template v-if="user">
            <div class="user-info">
              <span
                class="mx-2 font-weight-bold text-white"
                :class="{ active: activeLink === 'profile' }"
                @click="handleLinkClick('profile')"
              >
                <span class="user-label">Usuário</span>
                <span class="user-name">{{ user.nome }}</span>
              </span>
            </div>
  
            <Button
              class="nav-link circle-button my-2"
              style="background-color: #2c2c46; font-size: 14px"
              @click="signOutAndNavigate"
              text="Sair"
            ></Button>
          </template>
  
          <template v-else>
            <div class="d-flex">
              <router-link
                class="nav-link mx-2"
                :class="{ active: activeLink === 'login' }"
                to="/login"
                @click="handleLinkClick('login')"
              >
                Fazer Login
              </router-link>
  
              <router-link
                class="nav-link mx-2"
                :class="{ active: activeLink === 'cadastro' }"
                to="/cadastro"
                @click="handleLinkClick('cadastro')"
              >
                Cadastre-se
              </router-link>
            </div>
          </template>
        </div>
      </b-container>
    </b-navbar>
  </template>
  
  <script>
  import { useAuth } from '@src/hooks/useAuth';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const { user, signOut } = useAuth();
      const route = useRoute();
      const isAdmin = user ? user.isAdmin : false;
      const activeLink = ref(null);
  
      const handleLinkClick = link => {
        activeLink.value = link;
      };
  
      const handleLogoClick = () => {
        activeLink.value = null;
      };
  
      const signOutAndNavigate = () => {
        signOut();
        route.push('/');
      };
  
      return {
        user,
        isAdmin,
        activeLink,
        handleLinkClick,
        handleLogoClick,
        signOutAndNavigate
      };
    }
  };
  </script>
  
  <style scoped>
  /* Your custom styles */
  </style>
  