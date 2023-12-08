// Mesas.js
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
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
  const [isDesativarVisible, setIsDesativarVisible] = useState(false);
  const [ultimoIndiceMesaCriada, setUltimoIndiceMesaCriada] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchMesas();
    }, [])
  );

  const fetchMesas = () => {
    api
      .get("/mesas")
      .then((response) => {
        setMesas(response.data);
        // Atualizar o índice da última mesa criada
        if (response.data.length > 0) {
          setUltimoIndiceMesaCriada(response.data.length - 1);
        }
      })
      .catch((error) => console.error("Erro ao buscar mesas:", error));
  };

  const onMesaPress = (id, estado, idComanda) => {
    console.log(id, estado, idComanda);
    console.log(isDesativarVisible);
    setSelectedMesa(id);

    if (estado === "OCUPADA") {
      navigation.navigate("Comanda", {
        idComanda: idComanda,
        idMesa: id,
      });
    } else {
      setIsDesativarVisible(true);
      setModalVisible(true);
    }
  };

  const desativarMesa = async () => {
    if (selectedMesa) {
      try {
        const updatedMesas = mesas.map((mesa) => {
          if (mesa.id === selectedMesa) {
            return {
              ...mesa,
              estaAtiva: false,
            };
          }
          return mesa;
        });
        setMesas(updatedMesas);

        await api.put(`/mesas/${selectedMesa}`, {
          estaAtiva: false,
        });

        console.log("Mesa desativada com sucesso");
      } catch (error) {
        console.error("Erro ao desativar a mesa:", error);
      }
    }

    setModalVisible(false);
    setSelectedMesa(null);
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
    setIsDesativarVisible(false);
  };

  const criarNovaMesa = async () => {
    try {
      await api.post("/mesas");
      console.log("Nova mesa criada");
      setUltimoIndiceMesaCriada((prev) => (prev !== null ? prev + 1 : 0));

      fetchMesas();
    } catch (error) {
      console.error("Erro ao criar nova mesa:", error.message);
    }
  };

  const ativarMesa = async () => {
    if (selectedMesa) {
      try {
        const updatedMesas = mesas.map((mesa) => {
          if (mesa.id === selectedMesa) {
            return {
              ...mesa,
              estaAtiva: true,
            };
          }
          return mesa;
        });
        setMesas(updatedMesas);

        await api.put(`/mesas/${selectedMesa}`, {
          estaAtiva: true,
        });

        console.log("Mesa ativada com sucesso");
      } catch (error) {
        console.error("Erro ao ativar a mesa:", error);
      }
    }

    setModalVisible(false);
    setSelectedMesa(null);
  };

  const excluirMesa = async () => {
    if (ultimoIndiceMesaCriada !== null) {
      const ultimaMesaCriada = mesas[ultimoIndiceMesaCriada];

      if (ultimaMesaCriada && ultimaMesaCriada.estado === "LIVRE") {
        Alert.alert(
          "Confirmar Exclusão",
          "Tem certeza que deseja excluir a última mesa criada?",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Excluir",
              onPress: async () => {
                try {
                  await api.delete(`/mesas/${ultimaMesaCriada.id}`);
                  console.log("Mesa excluída com sucesso");

                  fetchMesas();
                } catch (error) {
                  console.error("Erro ao excluir a mesa:", error);
                }
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Aviso",
          "A última mesa criada não está no estado 'LIVRE'. Não é possível excluí-la."
        );
      }
    } else {
      Alert.alert("Aviso", "Não há mesas criadas para excluir.");
    }

    setModalVisible(false);
    setSelectedMesa(null);
    setIsDesativarVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "#e74c3c" }]}
            onPress={excluirMesa}
          >
            <Text style={{ color: "white" }}>Excluir Mesa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addButton,
              { position: "absolute", top: 0, right: 20 },
            ]}
            onPress={criarNovaMesa}
          >
            <Text style={{ color: "white" }}>+ Nova Mesa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mesasContainer}>
          {mesas.map((mesa, index) => (
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
          desativarMesa={desativarMesa}
          mesaAtiva={
            selectedMesa && mesas.find((m) => m.id === selectedMesa).estaAtiva
          }
          isDesativarVisible={isDesativarVisible}
          ativarMesa={ativarMesa}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
    paddingTop: 20, // Reduz o espaçamento superior
    paddingBottom: 20, // Reduz o espaçamento inferior
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10, // Reduz o espaçamento inferior dos botões
  },
  mesasContainer: {
    flexDirection: "row", // Exibe as mesas na mesma linha
    flexWrap: "wrap", // Permite que as mesas quebrem para a próxima linha
    justifyContent: "center", // Centraliza as mesas horizontalmente
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
});
export default Mesas;
