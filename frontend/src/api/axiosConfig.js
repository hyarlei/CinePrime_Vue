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
      }
    } else {
      console.error("Erro na solicitação:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
