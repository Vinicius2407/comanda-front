import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Mesa from "../../components/Mesa";
import api from "../../services/api";
import Modal from "./components/modal";
import { Body, Spacing } from "./styles";

const Mesas = ({ navigation }) => {
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);

  useEffect(() => {
    api
      .get("/mesas")
      .then((response) => setMesas(response.data))
      .catch((error) => console.error("Erro ao buscar mesas:", error));
  }, []);

  const onMesaPress = (id, estaAtiva) => {
    if (!estaAtiva) {
      setSelectedMesa(id);
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

      axios
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
    <Body>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {mesas.map((mesa) => (
          <Mesa key={mesa.id} {...mesa} onMesaPress={onMesaPress} />
        ))}
      </View>
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={ocuparMesa}
      />
    </Body>
  );
};

export default Mesas;
