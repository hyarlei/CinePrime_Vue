// import { createStore } from 'vuex';
// import axios from 'axios';

// const store = createStore({
//   state: {
//     token: null, // Inicialmente, o token é nulo
//   },
//   mutations: {
//     setToken(state, token) {
//       state.token = token; // Mutação que atualiza o token
//     },
//     clearToken(state) {
//       state.token = null; // Mutação que limpa o token (logout)
//     },
//   },
//   actions: {
//     async login({ commit }, credentials) {
//       try {
//         // Enviar as credenciais para o backend e obter o token
//         const response = await axios.post('http://localhost:3333/login', credentials);
//         const token = response.data.token;
        
//         // Salvar o token no Vuex
//         commit('setToken', token);

//         // Opcional: Armazenar o token no localStorage para persistência
//         localStorage.setItem('token', token);
//       } catch (error) {
//         console.error('Erro ao fazer login:', error);
//       }
//     },
//     logout({ commit }) {
//       // Remover o token da store e do localStorage
//       commit('clearToken');
//       localStorage.removeItem('token');
//     },
//     initializeStore({ commit }) {
//       // Inicializar a store com o token armazenado no localStorage, se existir
//       const token = localStorage.getItem('token');
//       if (token) {
//         commit('setToken', token);
//       }
//     },
//   },
// });

// export default store;
