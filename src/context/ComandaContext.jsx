import React, { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const ComandaContext = createContext();

export const ComandaProvider = ({ children }) => {
  const [comandas, setComandas] = useState({});

  const getComanda = async (idMesa) => {
    if (comandas[idMesa]) {
    } else {
      // Se a comanda ainda não foi carregada, busque os dados da API
      try {
        const response = api.get(`/comandas/${idMesa}`);
        if (!response.ok) {
          throw new Error("Erro ao obter dados da comanda");
        }
        const data = await response.json();
        setComandas((prevComandas) => ({ ...prevComandas, [idMesa]: data }));
        return data;
      } catch (error) {
        console.error("Erro ao obter dados da comanda:", error);
        return { idMesa, nomeCliente: "", totalAPagar: 0, pedidos: [] };
      }
    }
  };

  const updateComanda = (idMesa, data) => {
    setComandas((prevComandas) => ({
      ...prevComandas,
      [idMesa]: { ...prevComandas[idMesa], ...data },
    }));
  };

  const addPedido = (idMesa, pedido) => {
    setComandas((prevComandas) => {
      const comanda = prevComandas[idMesa] || {
        idMesa,
        nomeCliente: "",
        totalAPagar: 0,
        pedidos: [],
      };
      return {
        ...prevComandas,
        [idMesa]: { ...comanda, pedidos: [...comanda.pedidos, pedido] },
      };
    });
  };

  return (
    <ComandaContext.Provider value={{ getComanda, updateComanda, addPedido }}>
      {children}
    </ComandaContext.Provider>
  );
};

export const useComanda = () => {
  const context = useContext(ComandaContext);
  if (!context) {
    throw new Error("useComanda must be used within a ComandaProvider");
  }
  return context;
};
