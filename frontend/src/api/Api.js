import axios from "axios";

// Pegue a URL do backend a partir das variáveis de ambiente
const API_URL = process.env.VUE_BACKEND_PORT || 'https://cineprime-vue.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,  // Certifique-se de que o backend responde nesta rota
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // 10 segundos de timeout
});

export default api;
