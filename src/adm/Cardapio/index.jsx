import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  SectionList,
} from "react-native";
import { api } from "../../services/api";

const Cardapio = () => {
  const [categorias, setCategorias] = useState({});
  const [valorTotal, setValorTotal] = useState(0);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    // Função para buscar os itens do cardápio quando o componente é montado
    const fetchData = async () => {
      try {
        const response = await api.get("/cardapio");
        setItens(response.data);
      } catch (error) {
        console.error("Erro ao obter itens do cardápio:", error);
      }
    };

    // Chame a função para buscar os itens do cardápio
    fetchData();
  }, []); // Execute o efeito apenas uma vez durante a montagem do componente

  const handleIncrement = (id) => {
    const newItens = itens.map((item) =>
      item.id === id
        ? { ...item, quantidade: (item.quantidade || 0) + 1 }
        : item
    );
    setItens(newItens);
    calcularValorTotal(newItens);
  };

  const handleDecrement = (id) => {
    const newItens = itens.map((item) =>
      item.id === id && item.quantidade > 0
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );
    setItens(newItens);
    calcularValorTotal(newItens);
  };

  const calcularValorTotal = (itens) => {
    const total = itens.reduce(
      (acc, item) => acc + (item.quantidade || 0) * item.valor,
      0
    );
    setValorTotal(total);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text>{`${item.nome} - R$ ${item.valor.toFixed(2)}`}</Text>
        <Text
          style={styles.categoryText}
        >{`Categoria: ${item.categoria}`}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecrement(item.id)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantidade || 0}</Text>
        <TouchableOpacity onPress={() => handleIncrement(item.id)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  // Agrupa os itens por categoria
  const groupedItens = itens.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {});

  // Converte os dados agrupados para o formato esperado pela SectionList
  const sectionData = Object.keys(groupedItens).map((categoria) => ({
    title: categoria,
    data: groupedItens[categoria],
  }));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SectionList
        sections={sectionData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text
        style={{ marginTop: 20, fontSize: 18 }}
      >{`Valor Total: R$ ${valorTotal.toFixed(2)}`}</Text>
      <Button
        title="Finalizar Pedido"
        onPress={() => alert("Pedido finalizado!")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  sectionHeader: {
    backgroundColor: "blue",
    padding: 10,
    marginBottom: 10,
  },
  sectionHeaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cardapio;
