import axios from "axios";

const API_URL = "http://localhost:3333/employee";

const token = () => localStorage.getItem("token");

const employeeService = {
  async fetchEmployees() {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      throw error;
    }
  },

  async addEmployee(employee) {
    try {
      const response = await axios.post(API_URL, employee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      throw error;
    }
  },

  async editEmployee(id, employee) {
    try {
      await axios.put(`${API_URL}/${id}`, employee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
    } catch (error) {
      console.error("Erro ao editar funcionário:", error);
      throw error;
    }
  },

  async deleteEmployee(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      throw error;
    }
  },
};

export default employeeService;
