import apiClient from './axiosConfig';

export default {
  // Função para buscar todos os usuários
  getUsers() {
    return apiClient.get('/users');
  },

  // Função para buscar um usuário específico pelo ID
  getUser(id) {
    return apiClient.get(`/users/${id}`);
  },

  // Função para criar um novo usuário
  createUser(data) {
    return apiClient.post('/users', data);
  },

  // Função para atualizar um usuário existente
  updateUser(id, data) {
    return apiClient.put(`/users/${id}`, data);
  },

  // Função para deletar um usuário
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  },
};
