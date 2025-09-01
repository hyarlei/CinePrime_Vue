import axios from "axios";
import { API_KEY } from "./config";

// Cliente para a API do The Movie Database
const movieClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  params: {
    api_key: API_KEY
  }
});

// Interceptors para tratamento de erro específico para a API de filmes
movieClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`Erro na API de filmes: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error("Erro na solicitação à API de filmes:", error.message);
    }
    return Promise.reject(error);
  }
);

export default movieClient;
