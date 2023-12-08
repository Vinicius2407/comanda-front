import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import getCardapio from "../../components/getCardapio";
import Loading from "../../components/Loading";

import { api } from "../../services/api";

const ListaCardapio = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      getCardapio(setData, setLoading, setError);
    });
  }, [navigation]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const excluirCardapio = async (id) => {
    try {
      await api.delete(`/cardapio/${id}`, {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Lista de itens do cardápio</Text>

        {loading && <Loading />}
        {!loading && data?.length
          ? data.map((item, i) => (
              <Card style={styles.card} key={i}>
                <View style={styles.userInfo}>
                  <Text style={styles.userInfoText}>Nome: {item.nome}</Text>
                  <Text style={styles.userInfoText}>
                    Categoria: {item.categoria}
                  </Text>
                  <Text style={styles.userInfoText}>Valor: {item.valor}</Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("UpdateCardapio", { id: item.id })
                    }
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => excluirCardapio(item.id)}
                  >
                    <Text style={[styles.buttonText, styles.deleteButtonText]}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  userInfo: {
    marginBottom: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#38a69d",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
  },
});
export default ListaCardapio;
