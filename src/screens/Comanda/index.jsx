import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import Pedido from "../../components/Pedido";

const Comanda = ({ route }) => {
  const { idMesa, nomeCliente, totalAPagar, pedidos } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{`Comanda da Mesa ${idMesa}`}</Text>
      <Text>{`Cliente: ${nomeCliente}`}</Text>
      <Text>{`Total a Pagar: R$ ${totalAPagar.toFixed(2)}`}</Text>
      <Text>Pedidos:</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Pedido {...item} />}
      />
    </View>
  );
};
export default Comanda;
