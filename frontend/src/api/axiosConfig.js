import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Erro de autenticação. Redirecionando para login...");
      } else {
        console.error(`Erro na resposta: ${error.response.status} - ${error.response.statusText}`);
      }
    } else {
      console.error("Erro na solicitação:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
