<template>
  <div class="cinema-room">
    <h2>{{ room.name }}</h2>
    <p><strong>Capacidade:</strong> {{ room.capacity }} lugares</p>
    <p><strong>Horário:</strong> {{ room.hours }}</p>
    <div class="buttons">
      <button class="edit" @click="$emit('edit-room', room)">Editar</button>
      <button class="delete" @click="$emit('delete-room', room.id)">
        Excluir
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.cinema-room {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
}

.cinema-room button {
  width: 72px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.edit {
  background-color: #4caf50;
}

.delete {
  background-color: red;
}
</style>
