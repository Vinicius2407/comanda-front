import React, { useState, useEffect, useCallback } from "react";
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
import { TextInput } from "react-native-paper";

const Cardapio = ({ navigation, route }) => {
  const [categorias, setCategorias] = useState({});
  const [obs, setObs] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [itens, setItens] = useState([]);
  const [observacoes, setObservacoes] = useState({});
  const { idPedido, idMesa } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/cardapio");
        setItens(response.data);
      } catch (error) {
        console.error("Erro ao obter itens do cardápio:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleObservacaoChange = (itemId, observacao) => {
    setObservacoes((prevObservacoes) => ({
      ...prevObservacoes,
      [itemId]: observacao,
    }));
  };

  const RenderItem = ({ item, observacao, onObservacaoChange }) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text>{`${item.nome} - R$ ${item.valor.toFixed(2)}`}</Text>
          <TextInput
            onChangeText={onObservacaoChange}
            value={observacao}
            placeholder="Observacao"
            style={styles.input}
          />
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

  const adicionarObservacoesAosItens = () => {
    const novosItens = itens.map((item) => {
      const observacao = observacoes[item.id];
      return {
        ...item,
        observacoes: observacao || "", // Adiciona a observação ou uma string vazia se não houver observação
      };
    });

    // Atualiza o estado dos itens com as observações
    setItens(novosItens);
  };

  const addPedido = async () => {
    try {
      adicionarObservacoesAosItens();

      // Filtra os itens com quantidade maior que zero
      const itensParaEnviar = itens
        .filter((item) => item.quantidade > 0)
        .map((item) => {
          const { id, quantidade, observacoes } = item;
          const itemData = {
            cardapioId: id,
            quantidade: quantidade,
          };
          // Adiciona o campo "observacoes" apenas se houver uma observação para o item
          if (observacoes) {
            itemData.observacoes = observacoes;
          }
          return itemData;
        });

      await api.post(`/pedidos/pedido/${idPedido}`, itensParaEnviar);
      onComanda();
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error);

      // Verifique se a resposta HTTP está presente no objeto de erro
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
    <View style={{ flex: 1, padding: 16 }}>
      <SectionList
        sections={sectionData}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            observacao={observacoes[item.id] || ""}
            onObservacaoChange={(observacao) =>
              handleObservacaoChange(item.id, observacao)
            }
          />
        )}
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
