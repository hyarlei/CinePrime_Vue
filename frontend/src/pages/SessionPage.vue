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
// import { fetchSessions } from "@/service/sessionService";
import axios from "axios";
import SessionForm from "../components/SessionForm.vue";
// import {
//   createSession,
//   deleteSession,
//   fetchSessions,
//   updateSession
// } from "../service/sessionService";

// import { fetchRooms } from "../service/roomService";

export default {
  components: {
    SessionForm,
  },
  data() {
    return {
      sessions: [],
      movies: [],
      rooms: [],
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
    this.fetchSessions();
    this.fetchRooms();
  },
  // methods: {
  //   async loadSessions() {
  //     try {
  //       this.sessions = await fetchSessions();
  //       console.log("Carregou as sessoes")
  //     } catch (error) {
  //       console.error("Erro ao carregar sessões:", error);
  //     }
  //   },
  //   async loadRooms() {
  //     try {
  //       console.log("Carregou as salas")
  //       this.rooms = await fetchRooms();
  //     } catch (error) {
  //       console.error("Erro ao carregar salas:", error);
  //     }
  //   },
  //   getMovieTitle(movieId) {
  //     const movie = this.movies.find((m) => m.id === movieId);
  //     return movie ? movie.title : "Desconhecido";
  //   },
  //   getRoomName(roomId) {
  //     const room = this.rooms.find((r) => r.id === roomId);
  //     return room ? room.name : "Desconhecida";
  //   },
  //   addSession() {
  //     this.showForm = true;
  //     this.isEdit = false;
  //     this.currentSession = {
  //       id: null,
  //       movieId: null,
  //       roomId: null,
  //       time: "",
  //     };
  //   },
  //   async saveSession(session) {
  //     try {
  //       if (this.isEdit) {
  //         await updateSession(session.id, session);
  //       } else {
  //         await createSession(session);
  //       }
  //       await this.loadSessions();
  //       this.cancelEdit();
  //     } catch (error) {
  //       console.error("Erro ao salvar sessão:", error);
  //     }
  //   },
  //   async deleteSession(id) {
  //     try {
  //       await deleteSession(id);
  //       await this.loadSessions();
  //     } catch (error) {
  //       console.error("Erro ao excluir sessão:", error);
  //     }
  //   },
  //   cancelEdit() {
  //     this.showForm = false;
  //   },
  // },

  methods: {
    async fetchRooms() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3333/room", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.rooms = response.data;
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    },
    async fetchSessions() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3333/session", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.rooms = response.data;
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    },

    addRoom() {
      this.showForm = true;
      this.isEdit = false;
      this.currentRoom = {
        id: null,
        qtd_max: 0,
        typeExhibitionAccepted: "",
      };
    },

    editSession(session) {
      this.showForm = true;
      this.isEdit = true;
      this.currentSession = { ...session };
    },

    async saveSession(session) {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Passando o token pelo cabeçalho
        };
        if (this.isEdit) {
          await axios.put(
            `http://localhost:3333/session/${session.id}`,
            session,
            {
              headers,
            }
          );
        } else {
          const response = await axios.post(
            "http://localhost:3333/session",
            session,
            { headers }
          );
          this.sessions.push(response.data);
        }
        this.cancelEdit(); // Fecha o formulário
        this.fetchSessions(); // Atualiza a lista de salas
      } catch (error) {
        console.error("Erro ao salvar sala:", error);
      }
    },

    async deleteSession(id) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:3333/session/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Passando o token pelo cabeçalho
          },
        });
        this.fetchSessions();
      } catch (error) {
        console.error("Erro ao excluir sala:", error);
      }
    },

    cancelEdit() {
      this.showForm = false; // Fecha o formulário
    },
  },
};
</script>

<style scoped>
.session-list {
  height: 100%;
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
}

.delete {
  background-color: #f44336;
  width: 72px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete:hover {
  background-color: #d32f2f;
}

.edit:hover {
  background-color: #388e3c;
}
</style>
