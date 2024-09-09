import axios from "axios";

// const backEndPort = import.meta.env.VUE_BACKEND_PORT;
const backEndPort = 3333;

const api = axios.create({
  baseURL: `http://localhost:${backEndPort}`,
});

console.log(`Conectado com o back-end em: http://localhost:${backEndPort}`);

export default api;