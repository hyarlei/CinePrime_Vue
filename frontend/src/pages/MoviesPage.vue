<template>
  <div class="cards">
    <CardMovie
      v-for="movie in movies"
      :key="movie.id"
      :nome="movie.title"
      :url="getImageUrl(movie.poster_path)"
    />
  </div>
</template>

<script>
import { API_KEY } from "../api/config";
import apiClient from "../api/axiosConfig";

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
        const response = await apiClient.get(`popular`, {
          params: {
            api_key: API_KEY,
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
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 36px;
  padding: 0 54px;
}
</style>
