import React from "react";
import { View, Text } from "react-native";

const CardPedidos = ({ id, dataHora, valorTotal, itens }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Text>ID: {id}</Text>
      <Text>Data e Hora: {dataHora}</Text>
      <Text>Valor Total: R$ {valorTotal.toFixed(2)}</Text>

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Itens:</Text>
      <View>
        {itens.map((item, index) => (
          <Text key={index}>
            {item.nome} - Qtd: {item.quantidade}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default CardPedidos;
