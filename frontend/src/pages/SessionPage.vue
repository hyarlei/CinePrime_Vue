<template>
  <div class="session-list">
    <h1>Sessões de Cinema</h1>
    <button class="btn" @click="addSession">Adicionar Sessão</button>
    <div v-if="showForm">
      <SessionForm
        :session="currentSession"
        :isEdit="isEdit"
        @save="saveSession"
        @cancel="cancelEdit"
      />
    </div>
    <div v-if="sessions.length">
      <div v-for="session in sessions" :key="session.id" class="session-item">
        <p><strong>Filme:</strong> {{ session.movieTitle }}</p>
        <p>
          <strong>Sala:</strong> Sala {{ session.idRoom || "Indisponível" }}
        </p>
        <p><strong>Horário:</strong> {{ formatTime(session.dateTime) }}</p>
        <p><strong>Ingressos Atuais:</strong> {{ session.atualTicketsQtd }}</p>
        <p>
          <strong>Capacidade Máxima:</strong>
          {{ session.maxTicketsQtd }} lugares
        </p>
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
import sessionService from "../service/sessionService";
import SessionForm from "../components/SessionForm.vue";

export default {
  components: {
    SessionForm,
  },
  data() {
    return {
      sessions: [],
      showForm: false,
      isEdit: false,
      currentSession: {
        movieTitle: "",
        idRoom: null,
        dateTime: "",
        atualTicketsQtd: 0,
        maxTicketsQtd: 0,
      },
    };
  },
  created() {
    this.fetchSessions();
  },
  methods: {
    formatTime(dateTime) {
      const date = new Date(dateTime);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },

    async fetchSessions() {
      try {
        const response = await sessionService.fetchSessions();
        this.sessions = response;
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    },

    addSession() {
      this.showForm = true;
      this.isEdit = false;
      this.currentSession = {
        movieTitle: "",
        idRoom: null,
        dateTime: "",
        atualTicketsQtd: 0,
        maxTicketsQtd: 0,
      };
    },

    editSession(session) {
      this.showForm = true;
      this.isEdit = true;
      this.currentSession = { ...session };

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    async saveSession(session) {
      if (session.maxTicketsQtd <= 0) {
        alert("A quantidade máxima de ingressos deve ser maior que zero.");
        return;
      }

      session.atualTicketsQtd = session.maxTicketsQtd;

      try {
        if (this.isEdit) {
          await sessionService.editSession(session.id, session);
        } else {
          const newSession = await sessionService.addSession(session);
          this.sessions.push(newSession);
        }
        this.cancelEdit();
        this.fetchSessions();
      } catch (error) {
        console.error("Erro ao salvar sessão:", error);
      }
    },

    async deleteSession(id) {
      try {
        await sessionService.deleteSession(id);
        this.fetchSessions();
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
.session-list {
  padding: 20px;
  min-height: 100%;
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
