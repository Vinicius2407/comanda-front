import React, { useState } from "react";
import { View, StyleSheet, Button, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Mesa from "../../components/Mesa";

const Mesas = () => {
  const [mesas, setMesas] = useState(
    Array.from({ length: 3 }, (_, index) => ({
      id: index + 1,
      estado: 1,
      estaAtiva: true,
      cliente: "",
      pedidos: [],
    }))
  );
  const navigation = useNavigation();

  const selecionarMesa = (numeroMesa, nomeCliente) => {
    setMesas((prevMesas) =>
      prevMesas.map((mesa) =>
        mesa.id === numeroMesa
          ? {
              ...mesa,
              estado: 2,
              estaAtiva: true,
              cliente: nomeCliente,
              pedidos: [],
            }
          : mesa
      )
    );
    navigation.navigate("Comanda", {
      mesa: { id: numeroMesa, cliente: nomeCliente, pedidos: [] },
    });
  };

  const adicionarMesa = () => {
    const novaMesa = {
      id: mesas.length + 1,
      estado: 1,
      estaAtiva: true,
      cliente: "",
      pedidos: [],
    };
    setMesas([...mesas, novaMesa]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mesasContainer}>
          {mesas.map((mesa, index) => (
            <Mesa key={mesa.id} mesa={mesa} onSelect={selecionarMesa} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.botaoContainer}>
        <Button title="Nova Mesa" onPress={adicionarMesa} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mesasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  botaoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Mesas;
