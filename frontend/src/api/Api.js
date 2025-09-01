import axios from "axios";

// Pegue a URL do backend a partir das variáveis de ambiente
const API_URL = process.env.VUE_APP_BACKEND_URL || 'https://cineprime-vue.onrender.com';

const api = axios.create({
  baseURL: API_URL,  // URL completa do backend
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // 10 segundos de timeout
});

// Adiciona o token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tratamento de erros global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Tratamento específico para erros de autenticação
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        
        // Redirecionar para login se necessário
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
