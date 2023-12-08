import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

const CardPedidos = ({
  idPedido,
  itens,
  onExcluir,
  onGerarPdf,
  pedido,
  onExcluirPedido,
}) => {
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
          <View style={styles.itemInfoContainer}>
            <Text>{`Nome: ${item.cardapio.nome}`}</Text>
            <Text>{`Quantidade: ${item.quantidade}`}</Text>
            <Text>{`Valor: R$ ${item.cardapio.valor.toFixed(2)}`}</Text>
            {item.observacoes && (
              <Text>{`Observações: ${item.observacoes}`}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.excluirButton}
            onPress={() => onExcluir(item.id)}
          >
            <Text style={styles.excluirButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Valor Total do Pedido:</Text>
        <Text style={styles.totalValue}>{`R$ ${calcularValorTotal().toFixed(
          2
        )}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onGerarPdf(pedido)}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Gerar PDF
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => onExcluirPedido(idPedido)}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Excluir Pedido
        </Text>
      </TouchableOpacity>
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
  button: {
    alignItems: "center",
    backgroundColor: "#008080",
    marginBottom: 20,
    padding: 20,
    borderRadius: 8,
    borderWidth: 0,
    marginTop: 16,
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#e74c3c",
    marginBottom: 20,
    padding: 20,
    borderRadius: 8,
    borderWidth: 0,
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 8,
  },
  excluirButton: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  excluirButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  itemContainer: {
    flexDirection: "row", // Alteração: agora é uma linha
    justifyContent: "space-between", // Alteração: distribui espaço entre os elementos
    alignItems: "center", // Alteração: centraliza verticalmente
    marginBottom: 8,
  },
  itemInfoContainer: {
    flex: 1, // Alteração: ocupa o espaço disponível
  },
  excluirButton: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  excluirButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardPedidos;
