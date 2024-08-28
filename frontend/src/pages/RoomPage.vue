<template>
  <div class="cinema-rooms">
    <h1>Salas de Cinema Disponíveis</h1>
    <button class="btn" @click="addRoom">Adicionar Nova Sala</button>

    <div v-if="showForm">
      <form @submit.prevent="saveRoom">
        <input v-model="formRoom.name" placeholder="Nome da Sala" required />
        <input
          v-model.number="formRoom.capacity"
          type="number"
          placeholder="Capacidade"
          required
        />
        <input
          v-model="formRoom.hours"
          placeholder="Horário de Funcionamento"
          required
        />
        <button type="submit">{{ editMode ? "Atualizar" : "Salvar" }}</button>
        <button type="button" @click="cancelEdit">Cancelar</button>
      </form>
    </div>

    <Room
      v-for="room in rooms"
      :key="room.id"
      :room="room"
      @edit-room="editRoom"
      @delete-room="deleteRoom"
    />
  </div>
</template>

<script>
import Room from "../components/RoomComponent.vue";

export default {
  components: {
    Room,
  },
  data() {
    return {
      rooms: [
        { id: 1, name: "Sala 1", capacity: 100, hours: "10:00 - 22:00" },
        { id: 2, name: "Sala 2", capacity: 80, hours: "12:00 - 23:00" },
        { id: 3, name: "Sala 3", capacity: 120, hours: "11:00 - 21:00" },
      ],
      showForm: false,
      editMode: false,
      formRoom: {
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
      this.editMode = false;
      this.formRoom = { id: null, name: "", capacity: 0, hours: "" };
    },
    editRoom(room) {
      this.showForm = true;
      this.editMode = true;
      this.formRoom = { ...room };
    },
    saveRoom() {
      if (this.editMode) {
        const index = this.rooms.findIndex((r) => r.id === this.formRoom.id);
        this.$set(this.rooms, index, this.formRoom);
      } else {
        this.formRoom.id = Date.now(); // Geração simples de ID
        this.rooms.push({ ...this.formRoom });
      }
      this.showForm = false;
      this.formRoom = { id: null, name: "", capacity: 0, hours: "" };
    },
    deleteRoom(roomId) {
      this.rooms = this.rooms.filter((room) => room.id !== roomId);
    },
    cancelEdit() {
      this.showForm = false;
      this.formRoom = { id: null, name: "", capacity: 0, hours: "" };
    },
  },
};
</script>

<style scoped>
.cinema-rooms {
  padding: 20px;
}

.cinema-rooms button {
  margin-bottom: 20px;
}

.cinema-rooms form {
  margin-bottom: 20px;
}

.cinema-rooms input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
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
</style>
