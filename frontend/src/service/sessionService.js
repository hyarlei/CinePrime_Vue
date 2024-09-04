import apiClient from "../api/axiosConfig";

export async function createSession(sessionData) {
  try {
    const response = await apiClient.post('/sessions', sessionData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    throw error;
  }
}

export async function updateSession(sessionId, sessionData) {
  try {
    const response = await apiClient.put(`/sessions/${sessionId}`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar sessão:", error);
    throw error;
  }
}

export async function fetchSessions() {
  try {
    const response = await apiClient.get('/sessions');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    throw error;
  }
}

export async function deleteSession(sessionId) {
  try {
    const response = await apiClient.delete(`/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar sessão:", error);
    throw error;
  }
}
