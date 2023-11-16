import {
  View,
  StyleSheet,
  Image,
  Input,
  Button,
  Text,
  TextInput,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import getUser from "../../components/getUser";
import Loading from "../../components/Loading";
import UpdateScreen from "../UpdateScreen";
import api from "../../services/api";

const Lista = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const screen = navigation.addListener("focus", async () => {
      getUser(setData, setLoading, setError);
    });

    return screen;
  }, [navigation]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const excluirUsuario = async (id) => {
    await api
      .delete(`/usuarios/${id}`, {})
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Text style={styles.title}>Lista de usuarios</Text>

      {loading && <Loading />}
      {!loading && data?.length
        ? data.map((data, i) => (
            <Card style={{ marginBottom: 5, width: "85%" }} key={i}>
              <Text>{data.id}</Text>
              <Text>{data.nome}</Text>
              <Text>{data.atribuicao}</Text>
              <Button
                title="Update"
                onPress={() =>
                  navigation.navigate("UpdateScreen", { id: data.id })
                }
              />

              <Button title="Excluir" onPress={() => excluirUsuario(data.id)} />
            </Card>
          ))
        : null}
    </>
  );
};
export default Lista;

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
