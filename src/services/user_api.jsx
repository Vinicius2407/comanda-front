import { api } from "./api";

export const user_login = async (data) => {
  try {
    const result = await api("/auth/login", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
