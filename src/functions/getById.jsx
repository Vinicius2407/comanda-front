import { api, setAuthToken } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response?.data;
  } catch (e) {
    console.log(e);
  }
};

export default getUserById;
