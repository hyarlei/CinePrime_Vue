import api from "../api/Api";

// Função para obter o token, supondo que está no localStorage
function getToken() {
  return localStorage.getItem("token"); // Ou adapte conforme onde está armazenando o token
}

export async function createSession(sessionData) {
  try {
    const token = getToken();
    const response = await api.post("/session", sessionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    throw error;
  }
}

export async function updateSession(sessionId, sessionData) {
  try {
    const token = getToken();
    const response = await api.put(`/session/${sessionId}`, sessionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar sessão:", error);
    throw error;
  }
}

export async function fetchSessions() {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/session", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar salas:", error);
  }
}

export async function deleteSession(sessionId) {
  try {
    const token = getToken();
    await api.delete(`room/${sessionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    this.fetchSession();
  } catch (error) {
    console.error("Erro ao excluir sessão:", error);
  }
}