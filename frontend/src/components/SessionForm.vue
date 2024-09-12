<template>
  <div class="session-form">
    <h2>{{ isEdit ? "Editar Sala" : "Adicionar Sala" }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="movie">Filme:</label>
        <select v-model="localSession.movieTitle" required>
          <option v-for="movie in movies" :key="movie.id" :value="movie.title">
            {{ movie.title }}
          </option>
        </select>
      </div>
      <div>
        <label for="room">Sala:</label>
        <select v-model="localSession.idRoom" required>
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            {{ room.id }}
          </option>
        </select>
      </div>
      <div>
        <label for="time">Horário:</label>
        <input v-model="formattedTime" type="time" required />
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
  computed: {
    // Formatar o horário no formato HH:mm para o campo de input
    formattedTime: {
      get() {
        if (this.localSession.dateTime) {
          const date = new Date(this.localSession.dateTime);
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        }
        return "";
      },
      set(value) {
        if (value) {
          const [hours, minutes] = value.split(":");
          const date = new Date(this.localSession.dateTime || new Date());
          date.setHours(hours, minutes);
          this.localSession.dateTime = date;
        }
      },
    },
  },
  watch: {
    // Observa mudanças em maxTicketsQtd e atualiza atualTicketsQtd automaticamente
    "localSession.maxTicketsQtd"(newValue) {
      this.localSession.atualTicketsQtd = newValue;
    },
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
  methods: {
    submitForm() {
      const dateTime = new Date(this.localSession.dateTime).toISOString();
      this.localSession.dateTime = dateTime;

      this.localSession.atualTicketsQtd = this.localSession.maxTicketsQtd;

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
