import { api } from "../../services/api";

const getCardapio = async (setData, setLoading, setError) => {
  setLoading(true);

  try {
    const response = await api.get("/cardapio");

    setData(response?.data);

    setLoading(false);
  } catch (e) {
    setError(true);
    setLoading(false);
  }
};

export default getCardapio;
