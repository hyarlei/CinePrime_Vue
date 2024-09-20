import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    token: null,
    role: null,
    userName: null,
    userId: null,
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
    setUserId(state, name) {
      state.userId = name;
    },
    clearToken(state) {
      state.token = null;
      state.role = null;
      state.userName = null;
      state.userId = null;
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
        const userName = response.data.user.nome;
        const userId = response.data.user.id

        if (token) {
          commit("setToken", token);
          commit("setRole", role);
          commit("setUserName", userName);
          commit("setUserId", userId)

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("userName", userName);
          localStorage.setItem("userId", userId);
        } else {
          console.error("Token não retornado pela API.");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const userName = localStorage.getItem("userName");
      const userId = localStorage.getItem("userId")
      console.log("Initializing store with:", token, role, userName, userId);

      if (token) {
        commit("setToken", token);
      }
      if (role) {
        commit("setRole", role);
      }
      if (userName) {
        commit("setUserName", userName);
      }
      if (userId) {
        commit("setUserId", userId);
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
    userName(state) {
      return state.userName;
    },
  },
});

export default store;
