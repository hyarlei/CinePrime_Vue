import axios from "axios";

const API_URL = "http://localhost:3333/room";

const token = () => localStorage.getItem("token");

const roomService = {
  async fetchRooms() {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
      throw error;
    }
  },

  async addRoom(room) {
    try {
      const response = await axios.post(API_URL, room, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar sala:", error);
      throw error;
    }
  },

  async editRoom(id, room) {
    try {
      await axios.put(`${API_URL}/${id}`, room, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
    } catch (error) {
      console.error("Erro ao editar sala:", error);
      throw error;
    }
  },

  async deleteRoom(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      throw error;
    }
  },
};

export default roomService;
