// src/service/movieService.js
import apiClient from "../api/axiosConfig";
import { API_KEY } from "../api/config";

export async function fetchMovieDetails(movieId) {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
}

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
