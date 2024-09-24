import axios from "axios";

// const backEndPort = import.meta.env.VUE_BACKEND_PORT;
const API_URL = process.env.VUE_BACKEND_PORT || 'https://seu-backend-na-render.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // 10 segundos de timeout
});

export default api;