// Mesas.js
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import NomeClienteModal from "./components/modal";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../../services/api";
import Mesa from "../../components/Mesa";

const Mesas = ({ id, estaAtiva }) => {
  const [mesas, setMesas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Atualizar a lista de mesas sempre que a tela ganhar foco
      fetchMesas();
    }, [])
  );

  const fetchMesas = () => {
    api
      .get("/mesas")
      .then((response) => setMesas(response.data))
      .catch((error) => console.error("Erro ao buscar mesas:", error));
  };

  const onMesaPress = (id, estado, idComanda) => {
    console.log(id, estado, idComanda);
    if (estado == "OCUPADA") {
      setSelectedMesa(id);

      navigation.navigate("Comanda", {
        idComanda: idComanda,
        idMesa: id,
      });
    } else {
      setSelectedMesa(id);
      setModalVisible(true);
    }
  };

  const onComanda = async (idComanda) => {
    try {
      if (idComanda) {
        navigation.navigate("Comanda", {
          idComanda: idComanda,
          idMesa: selectedMesa,
        });
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
        const idMesa = selectedMesa;

        const updatedMesas = mesas.map((mesa) => {
          if (mesa.id === selectedMesa && mesa.estado === "LIVRE") {
            return {
              ...mesa,
              estado: "OCUPADA",
              estaAtiva: true,
              idComanda: idComanda,
            };
          }
          return mesa;
        });
        setMesas(updatedMesas);
        onComanda(idComanda, idMesa);
        api
          .put(`/mesas/${selectedMesa}`, {
            estado: "OCUPADA",
            estaAtiva: true,
            idComanda: idComanda,
          })
          .then((response) => {
            console.log("Mesa ocupada com sucesso");
          });
        fetchMesas();
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={[
            styles.addButton,
            { position: "absolute", top: 0, right: 20 },
          ]}
          onPress={criarNovaMesa}
        >
          <Text style={{ color: "white" }}>+ Nova Mesa</Text>
        </TouchableOpacity>

        {/* Conteúdo abaixo do botão Nova Mesa com padding de 40px */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {mesas.map((mesa) => (
              <Mesa
                key={mesa.id}
                {...mesa}
                onMesaPress={() =>
                  onMesaPress(mesa.id, mesa.estado, mesa.idComanda)
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
