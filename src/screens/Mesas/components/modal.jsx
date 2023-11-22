import React, { useState } from "react";
import { Modal, Button, TextInput } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const NomeClienteModal = ({ open, close, onConfirm }) => {
  const [nome, setNome] = useState("");

  const handleConfirm = () => {
    onConfirm(nome);
    setNome("");
    onClose();
  };

  return (
    <Modal
      visible={open}
      backdropStyle={styles.backdrop}
      onBackdropPress={close}
    >
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Confirmar" onPress={handleConfirm} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default NomeClienteModal;
