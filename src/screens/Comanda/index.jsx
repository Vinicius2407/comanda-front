import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import CardPedidos from "./components/CardPedidos";
import { api } from "../../services/api";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserContext } from "../../context/UserContext";

const Comanda = ({ navigation, route }) => {
  const [pedidos, setPedidos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const { userId, setContextUserId } = useUserContext();
  const { idComanda, idMesa, selectedMesa } = route.params;
  const [nomeCliente, setNomeCliente] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const carregarPedidos = async () => {
        try {
          const res = await api.get(`/comandas/${idComanda}`);
          setNomeCliente(res.data.nomeCliente);
          const response = await api.get(`/pedidos/comanda/${idComanda}`);
          setPedidos(response.data);

          // Calcular o valor total dos pedidos
          const total = response.data.reduce(
            (acc, pedido) =>
              acc +
              pedido.itens.reduce(
                (accItem, item) =>
                  accItem + (item.quantidade || 0) * item.cardapio.valor,
                0
              ),
            0
          );
          setValorTotal(total);
        } catch (error) {
          console.log("Erro ao obter pedidos da comanda:", error);
        }
      };
      carregarPedidos();
    }, [idComanda])
  );

  const criarPedido = async () => {
    try {
      const res = await api.post(`/pedidos/comanda/${idComanda}`, {
        idUsuario: userId,
        idMesa: idMesa,
      });
      console.log(res.data.idPedido);
      const idPedido = res.data.idPedido;
      console.log(idMesa);

      // Atualizar pedidos após criar um novo pedido
      const response = await api.get(`/pedidos/comanda/${idComanda}`);
      setPedidos(response.data);

      // Atualizar o valor total após criar um novo pedido
      const total = response.data.reduce(
        (acc, pedido) =>
          acc +
          pedido.itens.reduce(
            (accItem, item) =>
              accItem + (item.quantidade || 0) * item.cardapio.valor,
            0
          ),
        0
      );
      setValorTotal(total);

      navigation.navigate("Cardapio", { idPedido, idMesa: idMesa });
    } catch (error) {
      console.log(error);
    }
  };

  const excluirItem = async (idItem) => {
    try {
      await api.delete(`/pedidos/deletar/item/${idItem}`);

      // Após excluir o item, atualizar a lista de pedidos
      const response = await api.get(`/pedidos/comanda/${idComanda}`);
      setPedidos(response.data);

      // Atualizar o valor total após excluir o item
      const total = response.data.reduce(
        (acc, pedido) =>
          acc +
          pedido.itens.reduce(
            (accItem, item) =>
              accItem + (item.quantidade || 0) * item.cardapio.valor,
            0
          ),
        0
      );
      setValorTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  const fecharComanda = async () => {
    // Mostrar modal de confirmação
    Alert.alert(
      "Fechar Comanda",
      `Deseja realmente fechar a comanda de ${nomeCliente} ? O valor total é R$ ${valorTotal.toFixed(
        2
      )}.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              const res = await api.get(`/comandas/checkout/${idComanda}`);
              navigation.navigate("Mesas");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
            Comanda: {idComanda}
          </Text>
          <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
            Cliente: {nomeCliente}
          </Text>
          <Text
            style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}
          ></Text>
          <Text
            style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}
          ></Text>
          <View>
            {pedidos.map((pedido) => (
              <CardPedidos
                key={pedido.idPedido}
                itens={pedido.itens}
                idPedido={pedido.idPedido}
                onEditar={() => editarPedido(pedido.idPedido)}
                onExcluir={(idItem) => excluirItem(idItem)}
              />
            ))}
          </View>

          <Text
            style={{ marginTop: 20, fontSize: 18 }}
          >{`Valor Total: R$ ${valorTotal.toFixed(2)}`}</Text>

          <Button title="Adicionar Pedido" onPress={() => criarPedido()} />
          <Button title="Fechar Comanda" onPress={() => fecharComanda()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
    paddingTop: 40,
    paddingBottom: 60,
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 30,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});

export default Comanda;
