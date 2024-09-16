import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    token: null,
    role: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRole(state, role) {
      state.role = role;
    },
    clearToken(state) {
      state.token = null;
      state.role = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(
          "http://localhost:3333/auth",
          credentials
        );
        console.log("Response from login:", response.data);

        const token = response.data.user.token;
        const role = response.data.user.profile;

        console.log(response.data.user.nome)

        if (token) {
          commit("setToken", token);
          commit("setRole", role);

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
        } else {
          console.error("Token não retornado pela API.");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      console.log("Initializing store with:", token, role); // Verifique os valores recuperados

      if (token) {
        commit("setToken", token);
      }
      if (role) {
        commit("setRole", role);
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    userRole(state) {
      return state.role;
    },
  },
});

export default store;
