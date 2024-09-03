import apiClient from "../api/axiosConfig";
import { API_KEY } from "../api/config";

export async function fetchPopularMovies() {
  try {
    const response = await apiClient.get("/movie/popular", {
      params: {
        language: "pt-BR",
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
}
