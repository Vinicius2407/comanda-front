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

export default function Register() {
  const navigation = useNavigation();

  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [atribuicao, setAtribuicao] = useState("1");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [senhasIguais, setSenhasIguais] = useState(false);

  const atribuicoesProps = [
    { label: "GARCOM", value: "1" },
    { label: "ADMIN", value: "2" },
  ];

  const handlePost = async () => {
    await api
      .post("/auth/register", {
        nome: name,
        login: login,
        senha: password,
        atribuicao: atribuicao,
      })
      .then((res) => {
        console.log(res);
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error.response.data));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const verificaSenha = () => {
    if (confirmPassword === password) {
      setSenhasIguais(true);
    } else {
      setSenhasIguais(false);
    }
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

        <Text style={styles.title}>Senha</Text>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          placeholder="Senha"
          onChangeText={setPassword}
          onPress={toggleShowPassword}
          style={styles.input}
        />

        <Text style={styles.title}>Confirme sua senha</Text>
        <TextInput
          secureTextEntry={!showPassword}
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={(value) => {
            setConfirmPassword(value), verificaSenha;
          }}
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
        </View>

        <Button
          disabled={!(name && login && password)}
          style={styles.button}
          title="CADASTRAR"
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
