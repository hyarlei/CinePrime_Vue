<template>
  <div class="ticket-purchase">
    <h1>Compra de Ingresso para {{ movie.title }}</h1>
    <img :src="getImageUrl(movie.poster_path)" alt="Poster do filme" />
    <form @submit.prevent="purchaseTicket">
      <label for="quantity">Quantidade de Ingressos:</label>
      <input type="number" v-model="quantity" min="1" required />

      <label for="type">Tipo de Ingresso:</label>
      <select v-model="ticketType" required>
        <option value="Inteira">Inteira</option>
        <option value="Meia">Meia</option>
      </select>

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
      ticketType: "Inteira", // Tipo de ingresso padrão
      sessionId: this.$route.params.sessionId, // Supondo que a ID da sessão é passada via parâmetros de rota
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
      idUser: parseInt(localStorage.getItem("userId")),
      idSession: this.sessionId,
      type: this.ticketType,
    };

    await apiClient.post('/ticket', ticketData);
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

.ticket-purchase label {
  margin: 10px 0;
}

.ticket-purchase input,
.ticket-purchase select {
  margin-bottom: 10px;
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
