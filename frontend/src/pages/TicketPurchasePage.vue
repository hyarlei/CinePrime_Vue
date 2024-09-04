<template>
    <div class="ticket-purchase">
      <h1>Compra de Ingresso para {{ movie.title }}</h1>
      <img :src="getImageUrl(movie.poster_path)" alt="Poster do filme" />
      <form @submit.prevent="purchaseTicket">
        <label for="quantity">Quantidade de Ingressos:</label>
        <input type="number" v-model="quantity" min="1" required />
  
        <button type="submit">Comprar</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from "../api/axiosConfig";
import { API_KEY } from "../api/config";
  
  export default {
    name: "TicketPurchasePage",
    data() {
      return {
        movie: {},
        quantity: 1,
      };
    },
    created() {
      this.fetchMovieDetails();
    },
    methods: {
      async fetchMovieDetails() {
        const movieId = this.$route.params.id;
        try {
          const response = await apiClient.get(`/movie/${movieId}`, {
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
      async purchaseTicket() {
        try {
          const ticketData = {
            movieId: this.movie.id,
            quantity: this.quantity,
            // Adicione outras informações necessárias, como preço, se aplicável
          };
  
          await apiClient.post('/tickets', ticketData);
          alert('Ingresso comprado com sucesso!');
        } catch (error) {
          console.error("Erro ao comprar ingresso:", error);
        }
      },
      getImageUrl(path) {
        return `https://image.tmdb.org/t/p/w500${path}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .ticket-purchase {
    text-align: center;
  }
  
  .ticket-purchase img {
    max-width: 300px;
    margin: 20px 0;
  }
  
  .ticket-purchase form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .ticket-purchase button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .ticket-purchase button:hover {
    background-color: #0056b3;
  }
  </style>
  