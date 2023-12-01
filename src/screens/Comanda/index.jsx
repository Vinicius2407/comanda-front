import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import CardPedidos from "./components/CardPedidos";
import { api } from "../../services/api";
import { useUserContext } from "../../context/UserContext";

const Comanda = ({ navigation, route }) => {
  const [pedidos, setPedidos] = useState([]);
  const [post, setPost] = useState(null);
  const { userId, setContextUserId } = useUserContext();
  const { idComanda, idMesa } = route.params;

  const criarPedido = async () => {
    try {
      await api.post(`/pedidos/comanda/${idComanda}`, {
        idUsuario: userId,
        idMesa: idMesa,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
        Comanda: {idComanda}
      </Text>
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
        Usuario id : {userId}
      </Text>
      <View>
        {pedidos.map((pedido) => (
          <CardPedidos key={pedido.id} {...pedido} />
        ))}
      </View>

      <Button
        title="Adicionar Pedido"
        onPress={() => navigation.navigate("Cardapio")}
      />
    </View>
  );
};

export default Comanda;
