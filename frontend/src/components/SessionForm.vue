<template>
  <div class="session-form">
    <h2>{{ isEdit ? "Editar Sessão" : "Adicionar Sessão" }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="movie">Filme:</label>
        <select v-model="localSession.movieId" required>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.title }}
          </option>
        </select>
      </div>
      <div>
        <label for="room">Sala:</label>
        <select v-model="localSession.roomId" required>
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            {{ room.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="time">Horário:</label>
        <input v-model="localSession.time" type="time" required />
      </div>
      <button type="submit">{{ isEdit ? "Atualizar" : "Adicionar" }}</button>
      <button @click="$emit('cancel')" type="button">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { fetchPopularMovies } from '../service/movieService';

export default {
  props: {
    session: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    rooms: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      movies: [],
      localSession: { ...this.session },
    };
  },
  async created() {
    try {
      this.movies = await fetchPopularMovies();
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    }
  },
  watch: {
    session: {
      handler(newSession) {
        this.localSession = { ...newSession };
      },
      deep: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit('save', this.localSession);
    },
  },
};
</script>

<style scoped>
.session-form {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  background-color: #f9f9f9;
}
form div {
  margin-bottom: 12px;
}
</style>
