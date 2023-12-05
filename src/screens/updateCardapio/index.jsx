import React, { useState, useEffect } from "react";
import { Text, Input, Button, Radio, Layout } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Body, Spacing } from "./styles";
import { updateCardapio } from "../../functions/updateCardapio";
import { StyleSheet } from "react-native";
import getCardapioById from "../../functions/getCardapioById";
import Modal from "./components/modal";

const UpdateCardapio = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const schema = yup.object({
    nome: yup.string().required("Campo obrigatorio"),
    categoria: yup.number().required("Campo obrigatorio"),
    valor: yup.string().required("Campo obrigatorio"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const id = route?.params?.id;

  useEffect(() => {
    console.log(id);
  }, [id]);

  const save = (data) => {
    updateCardapio(id, data, setLoading, setError, setSuccess);
  };

  useEffect(() => {
    const screen = navigation.addListener("focus", async () => {
      if (id) {
        const response = await getCardapioById(id);
        setValue("nome", response?.nome);
        setValue("categoria", response?.categoria);
        setValue("valor", response?.valor);
      }
    });
    return screen;
  }, [navigation]);

  const closeModal = () => {
    setSuccess(false);
    navigation.navigate("ListaCardapio");
  };
  return (
    <Body>
      <Text>Nome: </Text>
      <Controller
        name="nome"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Digite o nome"
            size="large"
          />
        )}
      />
      {errors?.nome && <Text>{errors?.name?.message}</Text>}
      <Text>Valor:</Text>
      <Controller
        name="valor"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value ? value.toString() : ""} // Convertendo para string se existir um valor
            placeholder="Digite o valor"
            size="large"
          />
        )}
      />

      <Text>Categoria</Text>
      <Layout>
        <Controller
          name="categoria"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Prato</Text>
              <Radio checked={value === "1"} onChange={() => onChange("1")} />
              <Text>Bebida</Text>
              <Radio checked={value === "2"} onChange={() => onChange("2")} />
              <Text>Sobremesa</Text>
              <Radio checked={value === "3"} onChange={() => onChange("3")} />
            </>
          )}
        />
      </Layout>

      <Spacing />
      <Button onPress={handleSubmit(save)}>Salvar</Button>
      {success && (
        <Modal
          open={success}
          close={() => closeModal()}
          message="Cardapio editado com sucesso"
        />
      )}
    </Body>
  );
};

export default UpdateCardapio;

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
