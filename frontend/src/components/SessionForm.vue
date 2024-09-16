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
        <select
          v-model="localSession.idRoom"
          @change="updateMaxTicketsQtd"
          required
        >
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            {{ room.id }}
          </option>
        </select>
      </div>
      <div>
        <label for="time">Horário:</label>
        <input v-model="formattedTime" type="time" required />
      </div>
      <button class="actions" type="submit">{{ isEdit ? "Atualizar" : "Adicionar" }}</button>
      <button class="actions" @click="$emit('cancel')" type="button">Cancelar</button>
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
    // Atualiza a quantidade de ingressos disponíveis automaticamente
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

    // Se estiver editando, carregar os valores corretos
    if (this.isEdit && this.localSession.idRoom) {
      this.updateMaxTicketsQtd();
    }
  },
  methods: {
    updateMaxTicketsQtd() {
      const selectedRoom = this.rooms.find(
        (room) => room.id === this.localSession.idRoom
      );
      if (selectedRoom) {
        this.localSession.maxTicketsQtd = selectedRoom.qtd_max;
        this.localSession.atualTicketsQtd = selectedRoom.qtd_max;
      }
    },
    submitForm() {
      const dateTime = new Date(this.localSession.dateTime).toISOString();
      this.localSession.dateTime = dateTime;

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

.actions {
  width: 96px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 16px;
  margin-right: 8px;
}

.actions:hover {
  background-color: #0056b3;
}

form div {
  margin-bottom: 12px;
}
</style>
