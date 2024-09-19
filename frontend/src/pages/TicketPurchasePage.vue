<template>
  <div class="ticket-purchase">
    <h1>Compra de Ingresso para {{ movie.title }}</h1>
    <img :src="getImageUrl(movie.poster_path)" alt="Poster do filme" />

    <form @submit.prevent="submitForm">
      <label for="session">Escolha o horário:</label>
      <select v-model="selectedSessionId" required>
        <option
          v-for="session in filteredSessions"
          :key="session.id"
          :value="session.id"
        >
          {{ formatSessionTime(session.dateTime) }} - Sala {{ session.idRoom }}
        </option>
      </select>

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
import { fetchMovieDetails } from "@/service/movieService";
import { fetchSessions } from "@/service/sessionService";
import api from "../api/Api";

export default {
  name: "TicketPurchasePage",
  data() {
    return {
      movie: {},
      sessions: [],
      selectedSessionId: null,
      quantity: 1,
      ticketType: "Inteira",
    };
  },
  computed: {
    filteredSessions() {
      if (Array.isArray(this.sessions) && this.movie.title) {
        return this.sessions.filter(
          (session) =>
            session.movieTitle.toLowerCase() === this.movie.title.toLowerCase()
        );
      }
      return [];
    },
  },
  async created() {
    await this.fetchMovieDetails();
    try {
      this.sessions = await fetchSessions();
      console.log(this.sessions);
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  },
  methods: {
    async fetchMovieDetails() {
      const movieId = this.$route.params.id;
      try {
        this.movie = await fetchMovieDetails(movieId);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    },
    async submitForm() {
      try {
        const selectedSession = this.sessions.find(
          (session) => session.id === this.selectedSessionId
        );

        if (!selectedSession) {
          alert("Sessão não encontrada.");
          return;
        }

        if (selectedSession.atualTicketsQtd < this.quantity) {
          alert("Ingressos insuficientes disponíveis.");
          return;
        }

        selectedSession.atualTicketsQtd -= this.quantity;

        console.log(selectedSession.atualTicketsQtd);
        const token = localStorage.getItem("token");

        await api.put(
          `/session/${this.selectedSessionId}`,
          {
            atualTicketsQtd: selectedSession.atualTicketsQtd,
            movieTitle: selectedSession.movieTitle,
            idRoom: selectedSession.idRoom,
            maxTicketsQtd: selectedSession.maxTicketsQtd,
            dateTime: selectedSession.dateTime,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Ingresso comprado com sucesso!");

        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao comprar ingresso:", error);
      }
    },
    formatSessionTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
};
</script>

<style scoped>
.ticket-purchase {
  min-height: 100%;
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
