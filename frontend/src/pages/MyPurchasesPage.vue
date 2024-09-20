<template>
  <div class="purchase-list">
    <h1>Minhas Compras</h1>
    <div v-if="purchases.length">
      <div
        v-for="purchase in purchases"
        :key="purchase.id"
        class="purchase-item"
      >
        <p><strong>Filme:</strong> {{ purchase.session.movieTitle }}</p>
        <p><strong>Sala:</strong> Sala {{ purchase.session.idRoom }}</p>
        <p>
          <strong>Horário:</strong> {{ formatTime(purchase.session.dateTime) }}
        </p>
        <!-- <p>
          <strong>Quantidade de ingressos:</strong>
          {{ purchase.ticketQuantity }}
        </p> -->
      </div>
    </div>
    <div v-else>
      <p>Você não possui compras ainda.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      purchases: [],
      userId: null,
    };
  },
  created() {
    this.userId = parseInt(localStorage.getItem("userId"), 10);
    this.fetchTickets();
  },
  methods: {
    formatTime(dateTime) {
      const date = new Date(dateTime);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    async fetchTickets() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3333/ticket", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        this.purchases = response.data.filter(purchase => purchase.idUser === this.userId);
      } catch (error) {
        console.error("Erro ao buscar compras:", error);
      }
    },
  },
};
</script>


<style scoped>
.purchase-list {
  padding: 20px;
  min-height: 100%;
}

.purchase-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
}
</style>
