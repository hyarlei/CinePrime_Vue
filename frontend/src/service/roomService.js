import api from "../api/Api";

function getToken() {
  return localStorage.getItem("token");
}

export async function fetchRooms() {
  try {
    const token = getToken();
    const response = await api.get("/room", {
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
