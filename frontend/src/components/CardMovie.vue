<template>
  <div class="card">
    <div class="card-image">
      <img :src="url" alt="Imagem do Filme" />
      <div class="card-overlay">
        <h2>{{ nome }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardMovie",
  props: {
    nome: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  position: relative;
}

.card-image img {
  width: 100%;
  display: block;
  transition: opacity 0.3s;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;
}

.card-overlay h2 {
  color: white;
  font-size: 24px;
  margin: 0;
}

.card:hover .card-image img {
  opacity: 0.7;
}

.card:hover .card-overlay {
  opacity: 1;
}
</style>
