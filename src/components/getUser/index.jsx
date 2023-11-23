import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, setAuthToken } from "../../services/api";
import React from "react";

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
