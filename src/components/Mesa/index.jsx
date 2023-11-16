import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Mesa = ({ mesa, status, onSelect }) => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [editing, setEditing] = useState(false);
  const cor = mesa.estado === 1 ? "green" : "red";

  const confirmarMesa = () => {
    setEditing(false);
    onSelect(mesa.id, nomeCliente);
    // navigation.navigate("Comanda", { mesa });
  };

  return (
    <TouchableOpacity
      style={[styles.mesa, { backgroundColor: cor }]}
      onPress={() => setEditing(true)}
    >
      {editing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Cliente"
            onChangeText={(text) => setNomeCliente(text)}
          />
          <Button title="Confirmar" onPress={confirmarMesa} />
        </View>
      ) : (
        <>
          <Text style={styles.textoMesa}>{mesa.id}</Text>
          <Icon name="table" size={30} color="white" />
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mesa: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textoMesa: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  editContainer: {
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: 150,
    textAlign: "center",
  },
});

export default Mesa;
