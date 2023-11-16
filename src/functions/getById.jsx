import api from "../services/api";

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response?.data;
  } catch (e) {
    console.log("teste");
  }
};
