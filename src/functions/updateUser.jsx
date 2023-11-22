import { api } from "../services/api";

export const updateUser = async (
  id,
  data,
  setLoading,
  setError,
  setSuccess
) => {
  setLoading(true);
  try {
    await api.put(`/usuarios/${id}`, data);
    setLoading(false);
    setSuccess(true);
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
