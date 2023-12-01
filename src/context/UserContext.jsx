import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const loginContext = async (data) => {
    try {
      const result = await api("/auth/login", {
        method: "POST",
        data: data,
      });
      const userId = result.data.id;

      // Armazene o ID do usuário no contexto
      setUserId(userId);
      console.log(userId);
      return result;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <UserContext.Provider value={{ userId, loginContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
