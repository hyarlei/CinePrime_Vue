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
        <p><strong>Sala:</strong> Sala {{ session.idRoom }}</p>
        <p><strong>Horário:</strong> {{ session.dateTime }}</p>
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
import axios from "axios";
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
        roomId: null,
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
    async fetchSessions() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3333/session", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.sessions = response.data;
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    },

    addSession() {
      this.showForm = true;
      this.isEdit = false;
      this.currentSession = {
        movieTitle: "",
        roomId: null,
        dateTime: "",
        atualTicketsQtd: 0,
        maxTicketsQtd: 0,
      };
    },

    editSession(session) {
      this.showForm = true;
      this.isEdit = true;
      this.currentSession = { ...session };
    },

    async saveSession(session) {
      if (session.maxTicketsQtd <= 0) {
        alert("A quantidade máxima de ingressos deve ser maior que zero.");
        return;
      }

      session.atualTicketsQtd = session.maxTicketsQtd;

      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        console.log("Dados da sessão antes do envio:", session);

        if (this.isEdit) {
          await axios.put(
            `http://localhost:3333/session/${session.id}`,
            session,
            { headers }
          );
        } else {
          const response = await axios.post(
            "http://localhost:3333/session",
            session,
            { headers }
          );
          this.sessions.push(response.data);
        }
        this.cancelEdit();
        this.fetchSessions();
      } catch (error) {
        console.error("Erro ao salvar sessão:", error);
      }
    },
    async deleteSession(id) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:3333/session/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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
  height: 100%;
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
