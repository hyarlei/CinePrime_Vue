<template>
  <div class="room-list">
    <h1>Salas de Cinema</h1>
    <button class="btn" @click="addRoom">Adicionar Sala</button>
    <div v-if="showForm">
      <RoomForm
        :room="currentRoom"
        :isEdit="isEdit"
        @save="saveRoom"
        @cancel="cancelEdit"
      />
    </div>
    <div v-if="rooms.length">
      <div v-for="room in rooms" :key="room.id" class="room-item">
        <p><strong>Nome:</strong> Sala {{ room.id }}</p>
        <p><strong>Capacidade:</strong> {{ room.qtd_max }} lugares</p>
        <p>
          <strong>Tipo de exibição:</strong> {{ room.typeExhibitionAccepted }}
        </p>
        <div class="buttons">
          <button class="edit" @click="editRoom(room)">Editar</button>
          <button class="delete" @click="deleteRoom(room.id)">Excluir</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Não há salas disponíveis.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RoomForm from "../components/RoomForm.vue";

export default {
  components: {
    RoomForm,
  },
  data() {
    return {
      rooms: [],
      showForm: false,
      isEdit: false,
      currentRoom: {
        id: null,
        qtd_max: 0,
        typeExhibitionAccepted: "",
      },
    };
  },
  created() {
    this.fetchRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await axios.get("http://localhost:3333/room", {
          headers: {
            "Content-Type": "application/json",
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
    editRoom(room) {
      this.showForm = true;
      this.isEdit = true;
      this.currentRoom = { ...room };
    },
    async saveRoom(room) {
      try {
        if (this.isEdit) {
          await axios.put(`http://localhost:3333/room/${room.id}`, room);
        } else {
          const response = await axios.post("http://localhost:3333/room", room);
          this.rooms.push(response.data);
        }
        this.cancelEdit(); // Fecha o formulário
        this.fetchRooms(); // Atualiza a lista de salas
      } catch (error) {
        console.error("Erro ao salvar sala:", error);
      }
    },
    async deleteRoom(id) {
      try {
        await axios.delete(`http://localhost:3333/room/${id}`);
        this.fetchRooms();
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
.room-list {
  padding: 20px;
  height: 100%;
}

.room-item {
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
