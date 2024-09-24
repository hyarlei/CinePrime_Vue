import axios from "axios";

const API_URL = process.env.VUE_BACKEND_PORT || 'https://cineprime-vue.onrender.com';

const token = () => localStorage.getItem("token");

const sessionService = {
  async fetchSessions() {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar sessões:", error);
      throw error;
    }
  },

  async addSession(session) {
    try {
      const response = await axios.post(API_URL, session, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar sessão:", error);
      throw error;
    }
  },

  async editSession(id, session) {
    try {
      await axios.put(`${API_URL}/${id}`, session, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
    } catch (error) {
      console.error("Erro ao editar sessão:", error);
      throw error;
    }
  },

  async deleteSession(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
    } catch (error) {
      console.error("Erro ao excluir sessão:", error);
      throw error;
    }
  },
};

export default sessionService;
