/**
 * @fileoverview Serviço centralizado para chamadas à API do backend
 */
import api from '../api/Api';

/**
 * Serviço de autenticação
 */
export const authService = {
  /**
   * Realiza login do usuário
   * @param {Object} credentials - Credenciais do usuário
   * @returns {Promise} Resposta da API com dados do usuário e token
   */
  login(credentials) {
    return api.post('/auth', credentials);
  },

  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do novo usuário
   * @returns {Promise} Resposta da API com dados do usuário criado
   */
  register(userData) {
    return api.post('/user', userData);
  }
};

/**
 * Serviço para gerenciamento de usuários
 */
export const userService = {
  /**
   * Busca usuário por ID
   * @param {number} id - ID do usuário
   * @returns {Promise} Dados do usuário
   */
  getUserById(id) {
    return api.get(`/user/${id}`);
  },

  /**
   * Atualiza dados do usuário
   * @param {number} id - ID do usuário
   * @param {Object} userData - Novos dados do usuário
   * @returns {Promise} Dados do usuário atualizado
   */
  updateUser(id, userData) {
    return api.put(`/user/${id}`, userData);
  },

  /**
   * Remove um usuário
   * @param {number} id - ID do usuário
   * @returns {Promise} Confirmação da remoção
   */
  deleteUser(id) {
    return api.delete(`/user/${id}`);
  }
};

/**
 * Serviço para gerenciamento de ingressos
 */
export const ticketService = {
  /**
   * Busca todos os ingressos do usuário
   * @param {number} userId - ID do usuário
   * @returns {Promise} Lista de ingressos
   */
  getUserTickets(userId) {
    return api.get(`/ticket/user/${userId}`);
  },

  /**
   * Cria um novo ingresso
   * @param {Object} ticketData - Dados do ingresso
   * @returns {Promise} Dados do ingresso criado
   */
  createTicket(ticketData) {
    return api.post('/ticket', ticketData);
  }
};

/**
 * Serviço para gerenciamento de sessões
 */
export const sessionService = {
  /**
   * Busca todas as sessões
   * @returns {Promise} Lista de sessões
   */
  getAllSessions() {
    return api.get('/session');
  },

  /**
   * Busca sessão por ID
   * @param {number} id - ID da sessão
   * @returns {Promise} Dados da sessão
   */
  getSessionById(id) {
    return api.get(`/session/${id}`);
  },

  /**
   * Cria uma nova sessão
   * @param {Object} sessionData - Dados da sessão
   * @returns {Promise} Dados da sessão criada
   */
  createSession(sessionData) {
    return api.post('/session', sessionData);
  },

  /**
   * Atualiza uma sessão
   * @param {number} id - ID da sessão
   * @param {Object} sessionData - Novos dados da sessão
   * @returns {Promise} Dados da sessão atualizada
   */
  updateSession(id, sessionData) {
    return api.put(`/session/${id}`, sessionData);
  },

  /**
   * Remove uma sessão
   * @param {number} id - ID da sessão
   * @returns {Promise} Confirmação da remoção
   */
  deleteSession(id) {
    return api.delete(`/session/${id}`);
  }
};

/**
 * Serviço para gerenciamento de salas
 */
export const roomService = {
  /**
   * Busca todas as salas
   * @returns {Promise} Lista de salas
   */
  getAllRooms() {
    return api.get('/room');
  },

  /**
   * Busca sala por ID
   * @param {number} id - ID da sala
   * @returns {Promise} Dados da sala
   */
  getRoomById(id) {
    return api.get(`/room/${id}`);
  },

  /**
   * Cria uma nova sala
   * @param {Object} roomData - Dados da sala
   * @returns {Promise} Dados da sala criada
   */
  createRoom(roomData) {
    return api.post('/room', roomData);
  },

  /**
   * Atualiza uma sala
   * @param {number} id - ID da sala
   * @param {Object} roomData - Novos dados da sala
   * @returns {Promise} Dados da sala atualizada
   */
  updateRoom(id, roomData) {
    return api.put(`/room/${id}`, roomData);
  },

  /**
   * Remove uma sala
   * @param {number} id - ID da sala
   * @returns {Promise} Confirmação da remoção
   */
  deleteRoom(id) {
    return api.delete(`/room/${id}`);
  }
};
