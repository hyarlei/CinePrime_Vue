<template>
  <div class="session-list">
    <h1>Sessões de Cinema</h1>
    <button class="btn" @click="addSession">Adicionar Sessão</button>
    <div v-if="showForm">
      <SessionForm
        :session="currentSession"
        :isEdit="isEdit"
        :rooms="rooms"
        @save="saveSession"
        @cancel="cancelEdit"
      />
    </div>
    <div v-if="sessions.length">
      <div v-for="session in sessions" :key="session.id" class="session-item">
        <p><strong>Filme:</strong> {{ getMovieTitle(session.movieId) }}</p>
        <p><strong>Sala:</strong> {{ getRoomName(session.roomId) }}</p>
        <p><strong>Horário:</strong> {{ session.time }}</p>
        <div class="buttons">
          <button class="edit" @click="editSession(session)">Editar</button>
          <button class="delete" @click="deleteSession(session.id)">
            Excluir
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Não há sessões disponíveis.</p>
    </div>
  </div>
</template>

<script>
import SessionForm from "../components/SessionForm.vue";
import { fetchPopularMovies } from "../service/movieService";

export default {
  components: {
    SessionForm,
  },
  data() {
    return {
      sessions: [],
      movies: [],
      rooms: [
        { id: 1, name: "Sala 1", capacity: 100, hours: "10:00 - 22:00" },
        { id: 2, name: "Sala 2", capacity: 80, hours: "12:00 - 23:00" },
        { id: 3, name: "Sala 3", capacity: 120, hours: "11:00 - 21:00" },
      ],
      showForm: false,
      isEdit: false,
      currentSession: {
        id: null,
        movieId: null,
        roomId: null,
        time: "",
      },
    };
  },
  async created() {
    try {
      this.movies = await fetchPopularMovies();
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    }
  },
  methods: {
    getMovieTitle(movieId) {
      const movie = this.movies.find((m) => m.id === movieId);
      return movie ? movie.title : "Desconhecido";
    },
    getRoomName(roomId) {
      const room = this.rooms.find((r) => r.id === roomId);
      return room ? room.name : "Desconhecida";
    },
    addSession() {
      this.showForm = true;
      this.isEdit = false;
      this.currentSession = {
        id: null,
        movieId: null,
        roomId: null,
        time: "",
      };
    },
    editSession(session) {
      this.showForm = true;
      this.isEdit = true;
      this.currentSession = { ...session };
    },
    saveSession(session) {
      if (this.isEdit) {
        const index = this.sessions.findIndex((s) => s.id === session.id);
        this.$set(this.sessions, index, session);
      } else {
        session.id = Date.now(); // Simple ID generation for demo purposes
        this.sessions.push(session);
      }
      this.cancelEdit();
    },
    deleteSession(id) {
      this.sessions = this.sessions.filter((s) => s.id !== id);
    },
    cancelEdit() {
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.session-list {
  height: calc(100% - 120px);
  padding: 20px;
}
.session-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 16px;
}

.btn:hover {
  background-color: #0056b3;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
 
}

.edit {
  background-color: #4caf50;
  width: 72px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.delete {
  background-color: red;
  width: 72px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>
