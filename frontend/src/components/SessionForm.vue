<template>
  <div class="session-form">
    <h2>{{ isEdit ? "Editar Sala" : "Adicionar Sala" }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="movie">Filme:</label>
        <select v-model="localSession.movieTitle" required>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.title }}
          </option>
        </select>
      </div>
      <div>
        <label for="room">Sala:</label>
        <select v-model="localSession.roomId" required>
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            {{ room.id }}
          </option>
        </select>
      </div>
      <div>
        <label for="time">Horário:</label>
        <input v-model="localSession.dateTime" type="time" required />
      </div>
      <div>
        <label for="maxTicketsQtd">Quantidade Máxima de Ingressos:</label>
        <input v-model="localSession.maxTicketsQtd" type="number" required />
      </div>
      <button type="submit">{{ isEdit ? "Atualizar" : "Adicionar" }}</button>
      <button @click="$emit('cancel')" type="button">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { fetchRooms } from "@/service/roomService";
import { fetchPopularMovies } from "../service/movieService";

export default {
  props: {
    session: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      movies: [],
      rooms: [],
      localSession: { ...this.session },
    };
  },
  async created() {
    try {
      this.movies = await fetchPopularMovies();
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    }

    try {
      this.rooms = await fetchRooms();
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  },
  watch: {
    session: {
      handler(newSession) {
        this.localSession = { ...newSession };
      },
      deep: true,
    },
  },
  methods: {
    submitForm() {
      this.localSession.atualTicketsQtd = this.localSession.maxTicketsQtd;

      // Formatar a data e hora no formato ISO 8601
      // const dateTime = new Date(this.localSession.dateTime).toISOString();
      // this.localSession.dateTime = dateTime;

      console.log("Dados da sessão antes do envio:", this.localSession);
      this.$emit("save", this.localSession);
    },
  },
};
</script>

<style scoped>
.session-form {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  background-color: #f9f9f9;
}
form div {
  margin-bottom: 12px;
}
</style>
