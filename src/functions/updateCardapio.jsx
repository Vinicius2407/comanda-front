import { api } from "../services/api";

export const updateCardapio = async (
  id,
  data,
  setLoading,
  setError,
  setSuccess
) => {
  setLoading(true);
  try {
    await api.put(`/cardapio/${id}`, data);
    console.log(data);
    setLoading(false);
    setSuccess(true);
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
