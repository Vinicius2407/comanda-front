import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../../services/api";

const LogoutComponent = ({ navigation }) => {
  const handleLogout = async () => {
    // Limpe o token do AsyncStorage
    await AsyncStorage.removeItem("Token");

    // Limpe o token nos cabeçalhos do Axios
    await setAuthToken(null);

    // Redirecione o usuário para a tela de login (ou qualquer outra tela desejada)
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você deseja sair?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LogoutComponent;
