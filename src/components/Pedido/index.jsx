import React from "react";
import { View, Text } from "react-native";

const Pedido = ({ id, descricao, valor }) => (
  <View
    style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
  >
    <Text>{`Pedido ${id}: ${descricao} - R$ ${valor.toFixed(2)}`}</Text>
  </View>
);

export default Pedido;
