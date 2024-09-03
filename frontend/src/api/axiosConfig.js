import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor para adicionar o token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Recupera o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manipular respostas e erros
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Erro de autenticação. Redirecionando para login...");
        // Opção: Redirecionar para a página de login ou exibir uma mensagem de erro
        // window.location.href = "/login";
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
