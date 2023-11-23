import { api } from "../../../services/api";
import React from "react";

const getMesas = async (setData, setLoading, setError) => {
  setLoading(true);

  try {
    const response = await api.get("/mesas");
    setData(response?.data);

    setLoading(false);
  } catch (e) {
    setError(true);
    setLoading(false);
  }
};

export default getMesas;
