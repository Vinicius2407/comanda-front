import {
  View,
  StyleSheet,
  Image,
  Input,
  Button,
  Text,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    // Navegue para a tela de logout
    navigation.navigate("Logout");
  };

  const handleNavCardapio = () => {
    navigation.navigate("Cardapio");
  };

  const handleNavMesas = () => {
    navigation.navigate("Mesas");
  };

  const handleNavLista = () => {
    navigation.navigate("Lista");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo!</Text>

      <Button
        style={styles.button1}
        title="Cardapio"
        onPress={() => {
          handleNavCardapio();
        }}
      >
        Cardapio
      </Button>

      <Button
        style={styles.button1}
        title="Mesas"
        onPress={() => {
          handleNavMesas();
        }}
      >
        Mesas
      </Button>

      <Button
        style={styles.button1}
        title="Lista"
        onPress={() => {
          handleNavLista();
        }}
      >
        Lista
      </Button>

      <Button
        style={styles.button1}
        title="Logout"
        onPress={() => {
          handleLogoutPress();
        }}
      >
        Lista
      </Button>
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
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});
