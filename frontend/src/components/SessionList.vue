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
          <p><strong>Filme:</strong> {{ getMovieTitle(session.idMovie) }}</p>
          <p><strong>Sala:</strong> {{ getRoomName(session.idRoom) }}</p>
          <p><strong>Horário:</strong> {{ formatDateTime(session.dateTime) }}</p>
          <p><strong>Tipo de Exibição:</strong> {{ session.exibitionType }}</p>
          <p><strong>Tipo de Dublagem:</strong> {{ session.dublingType }}</p>
          <p><strong>Ingressos Atuais:</strong> {{ session.atualTicketsQtd }}</p>
          <p><strong>Capacidade Máxima:</strong> {{ session.maxTicketsQtd }}</p>
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
  import axios from 'axios';
import SessionForm from "../components/SessionForm.vue";
  
  export default {
    components: {
      SessionForm,
    },
    data() {
      return {
        sessions: [],
        rooms: [],
        showForm: false,
        isEdit: false,
        currentSession: {
          id: null,
          idMovie: null,
          idRoom: null,
          dateTime: "",
          exibitionType: "2D",
          dublingType: "Dublado",
          atualTicketsQtd: 0,
          maxTicketsQtd: 50,
        },
      };
    },
    async created() {
      try {
        await this.loadSessions();
        await this.loadRooms();
        await this.loadMovies();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    },
    methods: {
      async loadSessions() {
        try {
          const response = await axios.get('http://localhost:3333/session', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.sessions = response.data;
        } catch (error) {
          console.error("Erro ao carregar sessões:", error);
        }
      },
      async loadRooms() {
        try {
          const response = await axios.get('http://localhost:3333/rooms', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.rooms = response.data;
        } catch (error) {
          console.error("Erro ao carregar salas:", error);
        }
      },
      async loadMovies() {
        try {
          const response = await axios.get('http://localhost:3333/movies', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.movies = response.data;
        } catch (error) {
          console.error("Erro ao carregar filmes:", error);
        }
      },
      getMovieTitle(movieId) {
        const movie = this.movies.find((m) => m.id === movieId);
        return movie ? movie.title : "Desconhecido";
      },
      getRoomName(roomId) {
        const room = this.rooms.find((r) => r.id === roomId);
        return room ? room.name : "Desconhecida";
      },
      formatDateTime(dateTime) {
        return new Date(dateTime).toLocaleString();
      },
      addSession() {
        this.showForm = true;
        this.isEdit = false;
        this.currentSession = {
          id: null,
          idMovie: null,
          idRoom: null,
          dateTime: "",
          exibitionType: "2D",
          dublingType: "Dublado",
          atualTicketsQtd: 0,
          maxTicketsQtd: 50,
        };
      },
      editSession(session) {
        this.showForm = true;
        this.isEdit = true;
        this.currentSession = { ...session };
      },
      async saveSession(session) {
        try {
          if (this.isEdit) {
            await axios.put(`http://localhost:3333/session/${session.id}`, session, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
          } else {
            const response = await axios.post('http://localhost:3333/session', session, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            session.id = response.data.id;
            this.sessions.push(session);
          }
          await this.loadSessions();
          this.cancelEdit();
        } catch (error) {
          console.error("Erro ao salvar sessão:", error);
        }
      },
      async deleteSession(id) {
        try {
          await axios.delete(`http://localhost:3333/session/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.sessions = this.sessions.filter((s) => s.id !== id);
        } catch (error) {
          console.error("Erro ao excluir sessão:", error);
        }
      },
      cancelEdit() {
        this.showForm = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Mesma estilização fornecida anteriormente */
  </style>
  