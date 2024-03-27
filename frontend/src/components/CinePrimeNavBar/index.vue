<template>
  <div class="navbar" :class="{ 'bg-dark': isAuthenticated }">
    <div class="container">
      <div class="align-items-center">
        <router-link class="navbar-brand mb-3" to="/" @click="handleLogoClick">
          <img src="/assets/images/logo2.png" alt="CinePrime Logo" style="max-width: 100%; max-height: 80px;" />
        </router-link>
      </div>

      <div class="d-flex justify-content-center align-items-center w-100">
        <div class="d-flex align-items-center">
          <template v-if="isAuthenticated">
            <template v-if="isAdmin">
              <router-link class="nav-link mx-2" :class="{ active: activeLink === 'funcionarios' }"
                to="/funcionario/list" @click="handleLinkClick('funcionarios')">
                Funcionários
              </router-link>
            </template>

            <template v-else-if="user.profile === 'employee'">
              <router-link class="nav-link mx-2" :class="{ active: activeLink === 'filmes' }" to="/filme/list"
                @click="handleLinkClick('filmes')">
                Filmes
              </router-link>

              <router-link class="nav-link mx-2" :class="{ active: activeLink === 'salas' }" to="/sala/list"
                @click="handleLinkClick('salas')">
                Salas
              </router-link>

              <router-link class="nav-link mx-2" :class="{ active: activeLink === 'sessoes' }"
                style="margin-right: 20px;" to="/sessoes/list" @click="handleLinkClick('sessoes')">
                Sessões
              </router-link>
            </template>
          </template>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <template v-if="isAuthenticated">
          <div class="user-info">
            <span class="mx-2 font-weight-bold text-white" :class="{ active: activeLink === 'profile' }"
              @click="handleLinkClick('profile')">
              <span class="user-label">Usuário</span>
              <span class="user-name">{{ user.nome }}</span>
            </span>
          </div>

          <button class="nav-link circle-button my-2" style="background-color: #2c2c46; font-size: 14px;"
            @click="handleSignOut">
            Sair
          </button>
        </template>

        <template v-else>
          <div class="d-flex">
            <router-link class="nav-link mx-2" :class="{ active: activeLink === 'login' }" to="/login"
              @click="handleLinkClick('login')">
              Fazer Login
            </router-link>

            <router-link class="nav-link mx-2" :class="{ active: activeLink === 'cadastro' }" to="/cadastro"
              @click="handleLinkClick('cadastro')">
              Cadastre-se
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuth } from '@/hooks/useAuth';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const { user, signOut } = useAuth();
    const route = useRoute();
    const router = useRouter();
    const isAdmin = user ? user.isAdmin : false;

    const isAuthenticated = !!user;

    // Estado para controlar a aba ativa
    const activeLink = ref(null);

    const handleLinkClick = (link) => {
      activeLink.value = link;
    };

    const handleLogoClick = () => {
      activeLink.value = null;
    };

    const handleSignOut = () => {
      signOut();
      router.push('/');
    };

    return {
      user,
      isAdmin,
      isAuthenticated,
      activeLink,
      handleLinkClick,
      handleLogoClick,
      handleSignOut,
    };
  },
});
</script>

<style scoped>
/* Estilo básico da barra de navegação */
.navbar {
  height: 80px;
}

/* Estilo dos links de navegação */
.navbar .nav-link {
  padding: 10px;
  margin-right: 20px;
  border-radius: 5px;
  text-decoration: none;
  color: rgb(246, 242, 242);
  background-color: #3c3c58;
  font-size: 16px;
}

.navbar .nav-link:hover,
.navbar .nav-link:focus {
  background-color: #5b5b8b;
  font-weight: bold;
  color: rgb(231, 223, 223);
}

.navbar .nav-link.active {
  background-color: #4c4c75;
  font-weight: bold;
  color: rgb(231, 223, 223);
}

/* Estilo do texto do usuário */
.user-label {
  font-size: 14px;
  color: gray;
  margin-right: 8px;
}

/* Estilo do nome do usuario escolhido*/
.user-name {
  font-size: 16px;
  color: white;
}

/* Estilo da imagem do logo */
.navbar-logo {
  height: 60px;
  object-fit: contain;
}

.admin-label {
  font-size: 14px;
  color: gray;
  margin-right: 8px;
}

.nav-link {
  white-space: nowrap;
  width: 115px;
  text-align: center;
}
</style>
