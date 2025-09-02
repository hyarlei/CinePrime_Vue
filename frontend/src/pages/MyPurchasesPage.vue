<template>
  <div class="purchase-list">
    <h1>Minhas Compras</h1>
    <div v-if="purchases.length">
      <div
        v-for="purchase in purchases"
        :key="purchase.id"
        class="purchase-item"
      >
        <p><strong>Filme:</strong> {{ purchase.session?.movieTitle }}</p>
        <p><strong>Sala:</strong> Sala {{ purchase.session?.room?.id || purchase.session?.idRoom }}</p>
        <p>
          <strong>Horário:</strong> {{ formatTime(purchase.session?.dateTime) }}
        </p>
        <p><strong>Tipo de ingresso:</strong> {{ purchase.type }}</p>
        <p><strong>ID do ingresso:</strong> {{ purchase.id }}</p>
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
        // Buscar diretamente os tickets, que incluem as informações da sessão
        const response = await axios.get("http://localhost:3333/ticket", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Filtrar os tickets do usuário atual
        this.purchases = response.data.filter(ticket => ticket.idUser === this.userId);
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
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.purchase-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.purchase-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.purchase-item p {
  margin: 8px 0;
  font-size: 1rem;
}

.purchase-item strong {
  color: #333;
  font-weight: 600;
}
</style>
