// src/service/sessionService.js
import apiClient from "../api/axiosConfig";

// Função para buscar todas as sessões
export async function fetchSessions() {
  try {
    const response = await apiClient.get("/session");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    throw error;
  }
}

// Função para criar uma nova sessão
export async function createSession(sessionData) {
  try {
    const response = await apiClient.post("/session", sessionData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    throw error;
  }
}

// Função para atualizar uma sessão existente
export async function updateSession(sessionId, sessionData) {
  try {
    const response = await apiClient.put(`/session/${sessionId}`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar sessão:", error);
    throw error;
  }
}

// Função para deletar uma sessão
export async function deleteSession(sessionId) {
  try {
    await apiClient.delete(`/session/${sessionId}`);
  } catch (error) {
    console.error("Erro ao deletar sessão:", error);
    throw error;
  }
}
