<template>
  <div class="content" v-if="movie">
    <h1>{{ movie.title }}</h1>
    <img :src="getImageUrl(movie.poster_path)" alt="Poster do filme" />
    <h3>{{ movie.overview }}</h3>

    <button class="btn" @click="checkAuthAndRedirect">Comprar Ingresso</button>
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
        this.$router.push({
          name: "TicketPurchase",
          params: { id: this.movie.id },
        });
      } else {
        alert("Você precisa estar logado para comprar ingressos.");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.content{
min-height: 100%;
}

img {
  border-radius: 14px;
  width: 25%;
}

h3 {
  padding: 0 25%;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.btn:active {
  background-color: #004080;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(2px);
}
</style>
