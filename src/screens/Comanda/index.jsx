import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import CardPedidos from "./components/CardPedidos";
import { api } from "../../services/api";
import { useUserContext } from "../../context/UserContext";

const Comanda = ({ navigation, route }) => {
  const [pedidos, setPedidos] = useState([]);
  const [post, setPost] = useState(null);
  const { userId, setContextUserId } = useUserContext();
  const { idComanda, idMesa } = route.params;

  const criarPedido = async (idComanda) => {
    try {
      response = api.post(`/pedidos/comanda/${idComanda}`, {
        idUsuario: userId,
        idMesa: idMesa,
      });
      navigation.navigate("Cardapio");
    } catch {
      console.log(error);
    }
  };
  // Atualizando a lista de pedidos

  // const handleFecharComanda = async (id) => {
  //   try {
  //     // Adicione a lógica para fechar a comanda (excluindo)
  //     await api.delete(`/comandas/${id}`);

  //     // Adicione a lógica para desocupar a mesa (atualizar o estado para ativo)
  //     await api.put(`/mesas/${idMesa}`, {
  //       estaAtiva: true,
  //     });

  //     // Agora, podemos chamar a função para desocupar a mesa no componente pai
  //     onMesaDesocupada(idMesa);

  //     // Volte para a tela anterior após fechar a comanda
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error("Erro ao fechar a comanda:", error);
  //     // Adicione lógica para tratamento de erro, se necessário
  //   }
  // };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
        Comanda: {idComanda}
      </Text>
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
        Usuario id : {userId}
      </Text>
      <View>
        {pedidos.map((pedido) => (
          <CardPedidos key={pedido.id} {...pedido} />
        ))}
      </View>

      <Button
        title="Adicionar Pedido"
        onPress={() => {
          criarPedido(idComanda);
        }}
      />
      {/* <Button title="Excluir Comanda" onPress={handleFecharComanda(id)} /> */}
    </View>
  );
};

export default Comanda;
