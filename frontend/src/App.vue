<template>
  <div id="app">
    <!-- Barra de navegação global -->
    <NavBar />
    
    <!-- Área principal que será preenchida pelas rotas -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <!-- Transição entre páginas -->
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Rodapé global -->
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterComponent from "./components/FooterComponent.vue";

/**
 * @component App
 * @description Componente raiz da aplicação CinePrime
 */
export default {
  name: "App",
  components: {
    NavBar,
    FooterComponent,
  },
  
  /**
   * Inicializa o estado da aplicação ao ser montada
   */
  created() {
    // Inicializa o estado global da aplicação
    this.$store.dispatch('initializeStore');
  }
};
</script>

<style>
/* Estilos globais da aplicação */
:root {
  --primary-color: #e50914;
  --secondary-color: #221f1f;
  --text-color: #2c3e50;
  --light-color: #f8f9fa;
  --dark-color: #141414;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
}

.main-content {
  flex: 1;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Transição entre páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Botões padrão */
.btn {
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: darken(var(--primary-color), 10%);
}

/* Estilo para links */
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: darken(var(--primary-color), 10%);
}
</style>
