import React, { useState, useEffect } from "react";
import { Text, Input, Button, Radio, Layout } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Body, Spacing } from "./styles";
import { updateUser } from "../../functions/updateUser";
import { StyleSheet } from "react-native";
import getUserById from "../../functions/getById";
import Modal from "./components/modal";

const UpdateScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const schema = yup.object({
    nome: yup.string().required("Campo obrigatorio"),
    login: yup.string().required("Campo obrigatorio"),
    senha: yup.string().nullable(),
    atribuicao: yup.string().required("Campo obrigatorio"),
    estaAtivo: yup.boolean().required("Campo obrigatorio"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const id = route?.params?.id;

  useEffect(() => {
    console.log(id);
  }, [id]);

  const save = (data) => {
    updateUser(id, data, setLoading, setError, setSuccess);
  };

  useEffect(() => {
    const screen = navigation.addListener("focus", async () => {
      if (id) {
        const response = await getUserById(id);
        setValue("nome", response?.nome);
        setValue("login", response?.login);
        setValue("atribuicao", response?.atribuicao);
        setValue("estaAtivo", response?.estaAtivo);
      }
    });
    return screen;
  }, [navigation]);

  const closeModal = () => {
    setSuccess(false);
    navigation.navigate("Lista");
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
      <Text>Login:</Text>
      <Controller
        name="login"
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
      <Text>Senha:</Text>
      <Controller
        name="senha"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Digite a nova senha"
            size="large"
          />
        )}
      />
      <Text>Atribuicao</Text>
      <Layout>
        <Controller
          name="atribuicao"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Garcom</Text>
              <Radio
                checked={value === "GARCOM"}
                onChange={() => onChange("GARCOM")}
              />
              <Text>Cozinha</Text>
              <Radio
                checked={value === "COZINHA"}
                onChange={() => onChange("COZINHA")}
              />
              {console.log(value)}
            </>
          )}
        />
      </Layout>
      <Text>Status</Text>
      <Layout>
        <Controller
          name="estaAtivo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Ativo</Text>
              <Radio checked={value === true} onChange={() => onChange(true)} />
              <Text>Desativado</Text>
              <Radio
                checked={value === false}
                onChange={() => onChange(false)}
              />
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
          message="Usuario editado com sucesso"
        />
      )}
    </Body>
  );
};

export default UpdateScreen;

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
