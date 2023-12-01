import {
  View,
  StyleSheet,
  Image,
  Input,
  Button,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";

export default function AddCardapio() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("1");
  const [valor, setValor] = useState("");

  const categoriasProps = [
    { label: "PRATO", value: "1" },
    { label: "BEBIDA", value: "2" },
    { label: "SOBREMESA", value: "3" },
  ];

  const handlePost = async () => {
    await api
      .post("/cardapio", {
        nome: nome,
        categoria: categoria,
        valor: valor,
      })
      .then((res) => {
        console.log(res);
        navigation.navigate("Cardapio");
      })
      .catch((error) => console.log(error.response.data));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView>
      <View style={[styles.container, styles.box]}>
        <Text style={styles.title}>Nome</Text>

        <TextInput
          onChangeText={setNome}
          value={nome}
          placeholder="Nome do item"
          style={styles.input}
        />

        <TextInput
          onChangeText={setValor}
          value={valor}
          placeholder="Valor"
          style={styles.input}
        />

        <Text style={styles.title}>Categoria</Text>
        <View style={styles.inputRadioButton}>
          <View style={styles.inputRadioButton}>
            <RadioButton
              value="1"
              status={categoria === "1" ? "checked" : "unchecked"}
              onPress={() => setCategoria("1")}
            />
            <Text>PRATO</Text>
          </View>
          <View style={styles.inputRadioButton}>
            <RadioButton
              value="2"
              status={categoria === "2" ? "checked" : "unchecked"}
              onPress={() => setCategoria("2")}
            />
            <Text>BEBIDA</Text>
          </View>
          <View style={styles.inputRadioButton}>
            <RadioButton
              value="2"
              status={categoria === "3" ? "checked" : "unchecked"}
              onPress={() => setCategoria("3")}
            />
            <Text>SOBREMESA</Text>
          </View>
        </View>

        <Button
          style={styles.button}
          title="Confirmar"
          onPress={() => handlePost()}
        ></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  containerHeader: {
    marginTop: "10%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 14,
  },

  input: {
    height: 36,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    minWidth: 160,
  },
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 40,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRegister: {
    marginTop: 40,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
  inputRadioButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
