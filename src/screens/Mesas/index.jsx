// Mesas.js
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import NomeClienteModal from "./components/modal";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import Mesa from "../../components/Mesa";

const Mesas = ({ id, estaAtiva }) => {
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMesas();
  }, []);

  const fetchMesas = () => {
    api
      .get("/mesas")
      .then((response) => setMesas(response.data))
      .catch((error) => console.error("Erro ao buscar mesas:", error));
  };

  const onMesaPress = (id, estaAtiva, idComanda) => {
    console.log(id, estaAtiva, idComanda);
    if (!estaAtiva) {
      setSelectedMesa(id);
      navigation.navigate("Comanda", { idComanda });
    } else {
      setSelectedMesa(id);
      setModalVisible(true);
    }
  };

  const onComanda = async (idComanda) => {
    try {
      if (idComanda) {
        navigation.navigate("Comanda", { idComanda: idComanda });
      } else {
        console.error("ID de comanda inválido");
      }
    } catch (error) {
      console.error("Erro ao navegar para a página da comanda:", error);
    }
  };

  const ocuparMesa = async (nomeCliente) => {
    if (selectedMesa) {
      try {
        // Criar a comanda antes de ocupar a mesa
        const response = await api.post("/comandas", {
          nomeCliente,
          idMesa: selectedMesa,
          idComanda: idComanda,
        });
        const idComanda = response.data.idComanda;

        console.log(idComanda);

        const updatedMesas = mesas.map((mesa) => {
          if (mesa.id === selectedMesa && mesa.estado === "LIVRE") {
            return {
              ...mesa,
              estado: "OCUPADA",
              estaAtiva: false,
              idComanda: idComanda,
            };
          }
          return mesa;
        });
        setMesas(updatedMesas);
        onComanda(idComanda);
        api
          .put(`/mesas/${selectedMesa}`, {
            estado: "OCUPADA",
            estaAtiva: false,
            idComanda: idComanda,
          })
          .then((response) => {
            console.log("Mesa ocupada com sucesso");
          });
      } catch (error) {
        console.error("Erro ao criar a comanda:", error);
      }
    }
    setModalVisible(false);
    setSelectedMesa(null);
  };

  const criarNovaMesa = async () => {
    try {
      await api.post("/mesas");
      console.log("Nova mesa criada");

      fetchMesas();
    } catch (error) {
      console.error("Erro ao criar nova mesa:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={styles.addButton} onPress={criarNovaMesa}>
        <Text style={{ color: "white" }}>+ Nova Mesa</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {mesas.map((mesa) => (
          <Mesa
            key={mesa.id}
            {...mesa}
            onMesaPress={() =>
              onMesaPress(mesa.id, mesa.estaAtiva, mesa.idComanda)
            }
          />
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
const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
});
export default Mesas;
