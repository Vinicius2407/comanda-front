import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useComanda } from "../../context/ComandaContext";
import CardPedidos from "./components/CardPedidos";

const Comanda = ({ route }) => {
  const { idMesa, nomeCliente, totalAPagar } = route.params;
  const [pedidos, setPedidos] = useState([]);

  const adicionarPedido = () => {
    // Simulando um novo pedido
    const novoPedido = {
      id: pedidos.length + 1,
      dataHora: new Date().toLocaleString(),
      valorTotal: Math.random() * 100, // Valor total aleatório para exemplo
      itens: [
        { nome: "Item 1", quantidade: 2 },
        { nome: "Item 2", quantidade: 1 },
      ],
    };

    // Atualizando a lista de pedidos
    setPedidos([...pedidos, novoPedido]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Comanda da Mesa {idMesa}</Text>
      <Text>Cliente: {nomeCliente}</Text>
      <Text>Total a Pagar: R$ {totalAPagar}</Text>

      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
        Pedidos:
      </Text>
      <View>
        {pedidos.map((pedido) => (
          <CardPedidos key={pedido.id} {...pedido} />
        ))}
      </View>

      <Button title="Adicionar Pedido" onPress={adicionarPedido} />
    </View>
  );
};

export default Comanda;
