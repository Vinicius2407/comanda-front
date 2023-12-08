import React, { useState, useCallback } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const Cardapio = ({ navigation, route }) => {
  const [categorias, setCategorias] = useState({});
  const [obs, setObs] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [itens, setItens] = useState([]);
  const { idPedido, idMesa } = route.params;

  const fetchData = async () => {
    try {
      const response = await api.get("/cardapio");
      setItens(response.data);
    } catch (error) {
      console.error("Erro ao obter itens do cardápio:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleIncrement = useCallback(
    (id) => {
      const newItens = itens.map((item) =>
        item.id === id
          ? { ...item, quantidade: (item.quantidade || 0) + 1 }
          : item
      );
      setItens(newItens);
      calcularValorTotal(newItens);
    },
    [itens, setItens, calcularValorTotal]
  );

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

  const handleObservacoesChange = (id, text) => {
    const newItens = itens.map((item) =>
      item.id === id ? { ...item, observacoes: text } : item
    );
    setItens(newItens);
  };

  const RenderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={{ marginTop: 16, fontSize: 16, fontWeight: "bold" }}>{`${
            item.nome
          } - R$ ${item.valor.toFixed(2)}`}</Text>
          <TextInput
            value={item.observacoes}
            placeholder="Observacao"
            style={styles.input}
            onChangeText={(text) => handleObservacoesChange(item.id, text)}
            blurOnSubmit={false}
          />
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
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const groupedItens = itens.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {});

  const sectionData = Object.keys(groupedItens).map((categoria) => ({
    title: categoria,
    data: groupedItens[categoria],
  }));

  const addPedido = async () => {
    try {
      const itensParaEnviar = itens
        .filter((item) => item.quantidade > 0)
        .map((item) => {
          const { id, quantidade, observacoes } = item;
          const itemData = {
            cardapioId: id,
            quantidade: quantidade,
            observacoes: observacoes,
          };

          return itemData;
        });
      console.log(itensParaEnviar);
      await api.post(`/pedidos/pedido/${idPedido}`, itensParaEnviar);
      onComanda();
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error);

      if (error.response) {
        console.error("Detalhes da resposta HTTP:", error.response.data);
        console.error("Status HTTP:", error.response.status);
        console.error("Cabeçalhos HTTP:", error.response.headers);
      }
    }
  };

  const onComanda = async () => {
    try {
      console.log(idPedido);
      const result = await api.get(`/pedidos/${idPedido}`);
      const idComanda = result.data.idComanda;
      navigation.navigate("Comanda", { idComanda: idComanda, idMesa: idMesa });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionData}
        renderItem={({ item }) => <RenderItem item={item} />}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text
        style={{ marginTop: 20, fontSize: 18 }}
      >{`Valor Total: R$ ${valorTotal.toFixed(2)}`}</Text>
      <Button title="Finalizar Pedido" onPress={() => addPedido()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 20,
    marginHorizontal: 8,
    color: "#008080",
  },
  sectionHeader: {
    backgroundColor: "#008080",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  sectionHeaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    marginTop: 5,
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  totalContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
  },
});

export default Cardapio;
