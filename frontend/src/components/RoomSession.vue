<template>
    <div class="room-sessions">
      <h2>{{ room.name }}</h2>
      <p><strong>Capacidade:</strong> {{ room.capacity }} lugares</p>
      <p><strong>Horário:</strong> {{ room.hours }}</p>
      <div v-if="sessions.length">
        <h3>Sessões:</h3>
        <Session v-for="session in sessions" :key="session.id" :session="session" />
      </div>
      <div v-else>
        <p>Não há sessões disponíveis.</p>
      </div>
    </div>
  </template>
  
  <script>
  import Session from '../components/SessionComponent.vue';
  
  export default {
    components: {
      Session
    },
    props: {
      room: {
        type: Object,
        required: true
      },
      sessions: {
        type: Array,
        default: () => []
      }
    }
  }
  </script>
  
  <style scoped>
  .room-sessions {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
  }
  </style>
  