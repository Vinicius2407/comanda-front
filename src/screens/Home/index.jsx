import {
  View,
  StyleSheet,
  Image,
  Input,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    // Navegue para a tela de logout
    navigation.navigate("Logout");
  };

  const handleNavMesas = () => {
    navigation.navigate("Mesas");
  };

  const handleNavListaCardapio = () => {
    navigation.navigate("ListaCardapio");
  };

  const handleNavLista = () => {
    navigation.navigate("Lista");
  };

  const handleNavAddCardapio = () => {
    navigation.navigate("addCardapio");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo!</Text>

      <TouchableOpacity
        style={styles.button}
        title="Mesas"
        onPress={() => {
          handleNavMesas();
        }}
      >
        <Text style={styles.excluirButtonText}>Mesas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        title="Lista"
        onPress={() => {
          handleNavLista();
        }}
      >
        <Text style={styles.excluirButtonText}>Lista de usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        title="ListaCardapio"
        onPress={() => {
          handleNavListaCardapio();
        }}
      >
        <Text style={styles.excluirButtonText}>Lista do Cardapio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        title="addCardapio"
        onPress={() => {
          handleNavAddCardapio();
        }}
      >
        <Text style={styles.excluirButtonText}>Add Cardapio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        title="Logout"
        onPress={() => {
          handleLogoutPress();
        }}
      >
        <Text style={styles.excluirButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
    paddingTop: 120,
    paddingBottom: 60,
    alignItems: "center",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  excluirButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "regular",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#008080",
    marginBottom: 20,
    padding: 20,
    borderRadius: 8,
    borderWidth: 0,
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});
