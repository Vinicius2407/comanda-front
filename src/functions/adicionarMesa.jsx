import api from "../services/api";

export const adicionarMesa = async (data, setLoading, setError, setSuccess) => {
  setLoading(true);
  try {
    await api.post(`/mesas`, data);
    setLoading(false);
    setSuccess(true);
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
