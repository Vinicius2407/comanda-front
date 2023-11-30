import React from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

const NomeClienteModal = ({ isVisible, onClose, onConfirm }) => {
  const styles = StyleSheet.create({
    container: {
      minHeight: 400,
    },
    backdrop: {
      backgroundColor: "rgba(0,0,0, 0.5",
    },
  });

  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    onConfirm(data.nomeCliente);
    setValue("nomeCliente", ""); // Limpar o campo após a confirmação
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}
        >
          <Text style={{ marginBottom: 10 }}>Nome do Cliente</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Nome do Cliente"
              />
            )}
            name="nomeCliente"
            defaultValue=""
          />

          <Button title="Confirmar" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Modal>
  );
};

export default NomeClienteModal;
