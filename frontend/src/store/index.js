import { createStore } from "vuex";
import { jwtDecode } from 'jwt-decode';
import api from "../api/Api";

/**
 * Store Vuex para gerenciamento do estado de autenticação e usuário
 */
const store = createStore({
  state: {
    token: null,
    role: null,
    userName: null,
    userId: null,
    isLoading: false,
    error: null
  },
  getters: {
    /**
     * Verifica se o usuário está autenticado
     */
    isAuthenticated: state => !!state.token,
    
    /**
     * Retorna o papel/perfil do usuário atual
     */
    userRole: state => state.role,
    
    /**
     * Retorna o nome do usuário atual
     */
    userName: state => state.userName,
    
    /**
     * Verifica se o usuário é administrador
     */
    isAdmin: state => state.role === 'adm'
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRole(state, role) {
      state.role = role;
    },
    setUserName(state, name) {
      state.userName = name;
    },
    setUserId(state, id) {
      state.userId = id;
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
    setError(state, error) {
      state.error = error;
    },
    clearToken(state) {
      state.token = null;
      state.role = null;
      state.userName = null;
      state.userId = null;
      state.error = null;
    },
  },
  actions: {
    /**
     * Realiza o login do usuário
     * @param {Object} credentials - Credenciais do usuário (email e senha)
     */
    async login({ commit }, credentials) {
      commit('setLoading', true);
      commit('setError', null);
      
      try {
        const response = await api.post("/auth", credentials);
        
        const token = response.data.user.token;
        const userName = response.data.user.nome;
        const userId = response.data.user.id;
        const role = jwtDecode(token).profile;

        if (token) {
          commit("setToken", token);
          commit("setUserName", userName);
          commit("setUserId", userId);
          commit("setRole", role);

          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userRole", role);
        } else {
          commit('setError', 'Token não retornado pela API');
        }
      } catch (error) {
        commit('setError', error.response?.data?.message || 'Erro ao fazer login');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    
    /**
     * Realiza o logout do usuário
     */
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
    },
    
    /**
     * Inicializa o estado da store com dados do localStorage
     * Esta função é chamada ao inicializar a aplicação
     */
    initializeStore({ commit }) {
      const token = localStorage.getItem("token");
      const userName = localStorage.getItem("userName");
      const userId = localStorage.getItem("userId");
      
      // Verifica se o token expirou antes de usá-lo
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          // Se o token estiver expirado, faz logout
          if (decodedToken.exp < currentTime) {
            commit('clearToken');
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            localStorage.removeItem("userRole");
            return;
          }
          
          const role = decodedToken.profile;
          
          commit("setToken", token);
          commit("setRole", role);
          
          if (userName) {
            commit("setUserName", userName);
          }
          
          if (userId) {
            commit("setUserId", userId);
          }
        } catch (error) {
          console.error("Erro ao decodificar token:", error);
          commit('clearToken');
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
        }
      }
    }
  }
});

export default store;
