import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import CardPedidos from "./components/CardPedidos";
import { api } from "../../services/api";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserContext } from "../../context/UserContext";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";

const Comanda = ({ navigation, route }) => {
  const [pedidos, setPedidos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const { userId, setContextUserId } = useUserContext();
  const { idComanda, idMesa, selectedMesa } = route.params;
  const [nomeCliente, setNomeCliente] = useState("");
  const [pdfUri, setPdfUri] = useState(null);

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
    const pdfContent = generatePdfContent(); // Implemente esta função
    const pdfUri = await generatePdf(pdfContent);

    setPdfUri(pdfUri);
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
              viewPdf(pdfUri);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const viewPdf = async (pdfUri) => {
    try {
      await Print.printAsync({ uri: pdfUri });
    } catch (error) {
      console.error("Erro ao visualizar o PDF:", error);
    }
  };

  const generatePdf = async (content) => {
    try {
      const { uri } = await Print.printToFileAsync({ html: content });
      return uri;
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
      return null;
    }
  };

  const generatePdfContent = () => {
    // Inclua o cabeçalho do HTML
    let htmlContent = `
      <html>
        <body>
          <h1>Comanda: ${idComanda}</h1>
          <h2>Cliente: ${nomeCliente}</h2>
    `;

    // Itere sobre os pedidos e inclua os detalhes no HTML
    pedidos.forEach((pedido) => {
      // Adicione informações do pedido ao HTML
      htmlContent += `
        <div>
          <ul>
      `;

      // Itere sobre os itens do pedido e inclua no HTML
      pedido.itens.forEach((item) => {
        htmlContent += `
            <h2><li>${item.quantidade} x ${
          item.cardapio.nome
        } - R$ ${item.cardapio.valor.toFixed(2)}</li></h2>
        `;
      });

      // Feche as tags do HTML para o pedido
      htmlContent += `
          </ul>
        </div>
      `;
    });

    // Inclua o valor total no HTML
    htmlContent += `
        <h1>Valor Total: R$ ${valorTotal.toFixed(2)}</h1>
    `;

    // Inclua o rodapé do HTML
    htmlContent += `
        </body>
      </html>
    `;

    return htmlContent;
  };

  const gerarPdfPedido = async (pedido) => {
    const pdfContent = generatePdfPedidoContent(pedido);
    const pdfUri = await generatePdf(pdfContent);
    viewPdf(pdfUri);
  };

  const generatePdfPedidoContent = (pedido) => {
    let htmlContent = `
      <html>
        <body>
          <h1>Detalhes do Pedido</h1>
          <p>Pedido: ${pedido.idPedido}</p>
    `;

    if (pedido.itens && pedido.itens.length > 0) {
      pedido.itens.forEach((item) => {
        htmlContent += `
          <div>
            <h3>Nome: ${item.cardapio.nome}</h3>
            <h3>Quantidade: ${item.quantidade}</h3>
          </div>
        `;
      });
    } else {
      htmlContent += "<p>Não há itens neste pedido.</p>";
    }

    htmlContent += `
        </body>
      </html>
    `;

    return htmlContent;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ marginTop: 16, fontSize: 16, fontWeight: "bold" }}>
            Comanda: {idComanda}
          </Text>
          <Text
            style={{
              marginBottom: 20,
              marginTop: 16,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Cliente: {nomeCliente}
          </Text>

          <View>
            {pedidos.map((pedido) => (
              <CardPedidos
                key={pedido.idPedido}
                itens={pedido.itens}
                pedido={pedido}
                idPedido={pedido.idPedido}
                onEditar={() => editarPedido(pedido.idPedido)}
                onExcluir={(idItem) => excluirItem(idItem)}
                onGerarPdf={gerarPdfPedido}
              />
            ))}
          </View>

          <Text
            style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}
          >{`Valor Total da Comanda: R$ ${valorTotal.toFixed(2)}`}</Text>

          <TouchableOpacity style={styles.button} onPress={() => criarPedido()}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
              Criar Pedido
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => fecharComanda()}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Fechar Comanda
            </Text>
          </TouchableOpacity>
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
  button: {
    alignItems: "center",
    backgroundColor: "#008080",
    marginBottom: 20,
    padding: 20,
    borderRadius: 8,
    borderWidth: 0,
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
