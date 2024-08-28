<template>
    <div class="room-form">
      <h2>{{ isEdit ? "Editar Sala" : "Adicionar Sala" }}</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Nome da Sala:</label>
          <input v-model="localRoom.name" type="text" required />
        </div>
        <div>
          <label for="capacity">Capacidade:</label>
          <input v-model="localRoom.capacity" type="number" required />
        </div>
        <div>
          <label for="hours">Horário de Funcionamento:</label>
          <input v-model="localRoom.hours" type="text" required />
        </div>
        <button type="submit">{{ isEdit ? "Atualizar" : "Adicionar" }}</button>
        <button @click="$emit('cancel')" type="button">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      room: {
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
        localRoom: { ...this.room },
      };
    },
    watch: {
      room: {
        handler(newRoom) {
          this.localRoom = { ...newRoom };
        },
        deep: true,
      },
    },
    methods: {
      submitForm() {
        this.$emit('save', this.localRoom);
      },
    },
  };
  </script>
  
  <style scoped>
  .room-form {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px;
    background-color: #f9f9f9;
  }
  form div {
    margin-bottom: 12px;
  }
  </style>
  