import React, { useState, useEffect } from "react";
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
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import updateUser from "../../components/updateUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [atribuicao, setAtribuicao] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const atribuicoesProps = [
    { label: "Garçom", value: "1" },
    { label: "Cozinha", value: "2" },
  ];

  const [id, setID] = useState(null);

  useEffect(() => {
    setID(AsyncStorage.getItem("id"));
    setName(AsyncStorage.getItem("name"));
    setLogin(AsyncStorage.getItem("login"));
    setPassword(AsyncStorage.getItem("senha"));
    setAtribuicao(AsyncStorage.getItem("atribuicao"));
  }, []);

  const handleUpdate = async () => {
    await api
      .put("/usuarios/${id}", {
        nome: name,
        login: login,
        atribuicao: atribuicao,
      })
      .then((res) => {
        console.log(res);
        navigation.navigate("Lista");
      })
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView>
      <View style={[styles.container, styles.box]}>
        <Text style={styles.title}>Nome</Text>

        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="Digite seu nome"
          style={styles.input}
        />

        <Text style={styles.title}>Login</Text>
        <TextInput
          value={login}
          onChangeText={setLogin}
          placeholder="Digite seu login"
          style={styles.input}
        />

        <Text style={styles.title}>Nova Senha</Text>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          placeholder="Senha"
          onChangeText={setPassword}
          onPress={toggleShowPassword}
          style={styles.input}
        />

        <Text style={styles.title}>Atribuicao</Text>
        <View style={styles.inputRadioButton}>
          <View style={styles.inputRadioButton}>
            <RadioButton
              value="1"
              status={atribuicao === "1" ? "checked" : "unchecked"}
              onPress={() => setAtribuicao("1")}
            />
            <Text>Garçom</Text>
          </View>
          <View style={styles.inputRadioButton}>
            <RadioButton
              value="2"
              status={atribuicao === "2" ? "checked" : "unchecked"}
              onPress={() => setAtribuicao("2")}
            />
            <Text>Cozinha</Text>
          </View>

          <Button
            disabled={!(name && login && password)}
            style={styles.button}
            title="Atualizar"
            onPress={() => handleUpdate()}
          ></Button>
        </View>
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
