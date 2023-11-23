// Mesas.js
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import NomeClienteModal from "./components/modal";
import { useNavigation } from "@react-navigation/native";
import { useComanda } from "../../context/ComandaContext";
import { api } from "../../services/api";
import Mesa from "../../components/Mesa";

const Mesas = ({ id, estaAtiva }) => {
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const navigation = useNavigation();
  const { getComanda } = useComanda();

  useEffect(() => {
    api
      .get("/mesas")
      .then((response) => setMesas(response.data))

      .catch((error) => console.error("Erro ao buscar mesas:", error));
  }, []);

  const onMesaPress = (id, estaAtiva) => {
    if (!estaAtiva) {
      const comanda = getComanda(id);
      navigation.navigate("Comanda", comanda);
    } else {
      setModalVisible(true);
    }
  };

  const ocuparMesa = (nome) => {
    if (selectedMesa) {
      const updatedMesas = mesas.map((mesa) => {
        if (mesa.id === selectedMesa && mesa.estado === "LIVRE") {
          return {
            ...mesa,
            estado: "OCUPADA",
            estaAtiva: false,
            nomeCliente: nome,
          };
        }
        return mesa;
      });

      setMesas(updatedMesas);

      api
        .put(`/mesas/${selectedMesa}`, {
          estado: "OCUPADA",
          estaAtiva: false,
          nomeCliente: nome,
        })
        .then((response) => {
          console.log("Mesa ocupada com sucesso");
          navigation.navigate("Comanda", {
            idMesa: selectedMesa,
            nomeCliente: nome,
            totalAPagar: 0,
            pedidos: [],
          });
        })
        .catch((error) => console.error("Erro ao ocupar mesa:", error));
    }

    setModalVisible(false);
    setSelectedMesa(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {mesas.map((mesa) => (
          <Mesa key={mesa.id} {...mesa} onMesaPress={onMesaPress} />
        ))}
      </View>
      <NomeClienteModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={ocuparMesa}
      />
    </View>
  );
};
export default Mesas;
