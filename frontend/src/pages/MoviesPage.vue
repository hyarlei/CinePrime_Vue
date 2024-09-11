<template>
  <div class="cards">
    <CardMovie
      v-for="movie in movies"
      :key="movie.id"
      :nome="movie.title"
      :url="getImageUrl(movie.poster_path)"
      :movieId="movie.id"
    />
  </div>
</template>

<script>
import apiClient from "../api/axiosConfig";
import { API_KEY } from "../api/config";

import CardMovie from "../components/CardMovie.vue";

export default {
  components: { CardMovie },
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await apiClient.get(`/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
};
</script>

<style scoped>
.cards {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 36px;
}
</style>
