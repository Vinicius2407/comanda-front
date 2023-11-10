import api from "../../services/api";

const getUser = async (setData, setLoading, setError) => {
  setLoading(true);

  try {
    const response = await api.get("/usuarios");
    setData(response?.data);

    setLoading(false);
  } catch (e) {
    setError(true);
    setLoading(false);
  }
};

export default getUser;
