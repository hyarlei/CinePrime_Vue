<template>
  <div class="room-form">
    <h2>{{ isEdit ? "Editar Sala" : "Adicionar Sala" }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="qtd_max">Capacidade:</label>
        <input v-model="localRoom.qtd_max" type="number" required />
      </div>
      <div>
        <select v-model="localRoom.typeExhibitionAccepted" required>
          <option value="2D" selected>2D</option>
          <option value="3D">3D</option>
        </select>
      </div>
      <button class="actions" type="submit">{{ isEdit ? "Atualizar" : "Adicionar" }}</button>
      <button class="actions" @click="$emit('cancel')" type="button">Cancelar</button>
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
      this.$emit("save", this.localRoom);
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

.actions {
  width: 96px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 16px;
  margin-right: 8px;
}

.actions:hover {
  background-color: #0056b3;
}

form div {
  margin-bottom: 12px;
}
</style>
