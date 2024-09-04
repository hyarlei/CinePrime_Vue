import apiClient from "../api/axiosConfig";

// Função para buscar as salas disponíveis
export async function fetchRooms() {
  try {
    const response = await apiClient.get("/room");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar salas:", error);
    throw error;
  }
}
