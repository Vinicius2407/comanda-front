import React from "react";
import { View, Text } from "react-native";

const Pedido = ({ pedido }) => {
  return (
    <View
      style={{ borderWidth: 1, borderColor: "gray", padding: 10, margin: 5 }}
    >
      <Text>ID: {pedido.id}</Text>
      <Text>Data/Hora: {pedido.dataHora}</Text>
      <Text>Valor: {pedido.valor}</Text>
      {/* Adicione mais informações do pedido conforme necessário */}
    </View>
  );
};

export default Pedido;
