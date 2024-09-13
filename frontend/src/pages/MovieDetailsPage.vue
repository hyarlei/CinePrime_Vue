<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <img :src="getImageUrl(movie.poster_path)" alt="Poster do filme" />
    <p>{{ movie.overview }}</p>

    <button @click="checkAuthAndRedirect">Comprar Ingresso</button>
  </div>
</template>

<script>
import apiClient from "../api/axiosConfig";
import { API_KEY } from "../api/config";
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movie: null,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  created() {
    this.fetchMovieDetails();
  },
  methods: {
    async fetchMovieDetails() {
      try {
        const response = await apiClient.get(`/movie/${this.id}`, {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
          },
        });
        this.movie = response.data;
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
    checkAuthAndRedirect() {
      if (this.isAuthenticated) {
        this.$router.push({ name: 'TicketPurchase', params: { id: this.movie.id } });
      } else {
        alert("Você precisa estar logado para comprar ingressos.");
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
/* Estilize a página de detalhes como desejar */
</style>
