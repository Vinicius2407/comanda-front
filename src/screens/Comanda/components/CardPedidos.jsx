import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardPedidos = ({ itens }) => {
  // Função para calcular o valor total do pedido
  const calcularValorTotal = () => {
    return itens.reduce(
      (total, item) => total + item.cardapio.valor * item.quantidade,
      0
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Detalhes do Pedido</Text>
      {itens.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text>{`Nome: ${item.cardapio.nome}`}</Text>
          <Text>{`Quantidade: ${item.quantidade}`}</Text>
          <Text>{`Valor: R$ ${item.cardapio.valor.toFixed(2)}`}</Text>
          {item.observacoes && (
            <Text>{`Observações: ${item.observacoes}`}</Text>
          )}
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Valor Total do Pedido:</Text>
        <Text style={styles.totalValue}>{`R$ ${calcularValorTotal().toFixed(
          2
        )}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 8,
  },
  totalContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
  },
});

export default CardPedidos;
