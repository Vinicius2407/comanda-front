import { api } from "../services/api";

const getCardapioById = async (id) => {
  try {
    const response = await api.get(`/cardapio/${id}`);
    return response?.data;
  } catch (e) {
    console.log(e);
  }
};

export default getCardapioById;
