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

export default function Comanda() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Digite seu login" style={styles.input} />

      <Text style={styles.title}>Senha</Text>
      <TextInput placeholder="Senha" style={styles.input} />

      <Button
        style={styles.button}
        title="Entrar"
        onPress={() => {
          login();
        }}
      >
        Entrar
      </Button>

      <Text
        style={styles.fazerCadastro}
        title="Cadastro"
        onPress={() => {
          handleNavCadastro();
        }}
      >
        Realizar cadastro
      </Text>
    </View>
  );
}
