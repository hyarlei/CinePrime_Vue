import movieClient from "../api/axiosConfig";

/**
 * Busca detalhes de um filme específico pelo ID
 * @param {number} movieId - ID do filme no The Movie Database
 * @returns {Promise<Object>} - Detalhes do filme
 */
export async function fetchMovieDetails(movieId) {
  try {
    const response = await movieClient.get(`/movie/${movieId}`, {
      params: {
        language: "pt-BR",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
}

/**
 * Busca a lista de filmes populares
 * @returns {Promise<Array>} - Lista de filmes populares
 */
export async function fetchPopularMovies() {
  try {
    const response = await movieClient.get("/movie/popular", {
      params: {
        language: "pt-BR",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
}

/**
 * Busca filmes por termo de pesquisa
 * @param {string} query - Termo de pesquisa
 * @returns {Promise<Array>} - Lista de filmes encontrados
 */
export async function searchMovies(query) {
  try {
    const response = await movieClient.get("/search/movie", {
      params: {
        language: "pt-BR",
        query: query
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao pesquisar filmes:", error);
    throw error;
  }
}
