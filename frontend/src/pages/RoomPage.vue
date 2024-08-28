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
        <p><strong>Nome:</strong> {{ room.name }}</p>
        <p><strong>Capacidade:</strong> {{ room.capacity }} lugares</p>
        <p><strong>Horário:</strong> {{ room.hours }}</p>
        <div class="buttons">
          <button class="edit" @click="editRoom(room)">Editar</button>
          <button class="delete" @click="deleteRoom(room.id)">
            Excluir
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Não há salas disponíveis.</p>
    </div>
  </div>
</template>

<script>
import RoomForm from "../components/RoomForm.vue";

export default {
  components: {
    RoomForm,
  },
  data() {
    return {
      rooms: [
        { id: 1, name: "Sala 1", capacity: 100, hours: "10:00 - 22:00" },
        { id: 2, name: "Sala 2", capacity: 80, hours: "12:00 - 23:00" },
        { id: 3, name: "Sala 3", capacity: 120, hours: "11:00 - 21:00" },
      ],
      showForm: false,
      isEdit: false,
      currentRoom: {
        id: null,
        name: "",
        capacity: 0,
        hours: "",
      },
    };
  },
  methods: {
    addRoom() {
      this.showForm = true;
      this.isEdit = false;
      this.currentRoom = {
        id: null,
        name: "",
        capacity: 0,
        hours: "",
      };
    },
    editRoom(room) {
      this.showForm = true;
      this.isEdit = true;
      this.currentRoom = { ...room };
    },
    saveRoom(room) {
      if (this.isEdit) {
        const index = this.rooms.findIndex((r) => r.id === room.id);
        this.$set(this.rooms, index, room);
      } else {
        room.id = Date.now();
        this.rooms.push(room);
      }
      this.cancelEdit();
    },
    deleteRoom(id) {
      this.rooms = this.rooms.filter((r) => r.id !== id);
    },
    cancelEdit() {
      this.showForm = false;
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
