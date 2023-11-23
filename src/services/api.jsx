import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080",
});

const setAuthToken = async (token) => {
  if (token) {
    console.log("logado");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem("Token", token);
  }
  // } else {
  //   console.log("remove token");
  //   delete api.defaults.headers.common["Authorization"];
  //   await AsyncStorage.removeItem("Token");
  // }
};

api.interceptors.request.use(
  async (config) => {
    console.log("token usado");
    await setAuthToken(); // Chame a função para definir o token antes de cada requisição
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, setAuthToken };
