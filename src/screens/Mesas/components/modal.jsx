import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

const NomeClienteModal = ({
  isVisible,
  onClose,
  onConfirm,
  mesaAtiva,
  desativarMesa,
  isDesativarVisible,
  ativarMesa,
}) => {
  const styles = StyleSheet.create({
    container: {
      minHeight: 400,
    },
    backdrop: {
      backgroundColor: "rgba(0,0,0, 0.5)",
    },
    disabledButton: {
      backgroundColor: "gray",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    },
    enabledButton: {
      backgroundColor: "green",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
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
          {/* Botão para desativar a mesa (aparece apenas quando mesa está livre e é ativa) */}
          {isDesativarVisible && (
            <TouchableOpacity
              style={styles.disabledButton}
              onPress={desativarMesa}
            >
              <Text style={{ color: "white" }}>Desativar Mesa</Text>
            </TouchableOpacity>
          )}

          {/* Condicionalmente renderizar input ou botão para ativar mesa */}
          {mesaAtiva ? (
            <View>
              <Text style={{ marginBottom: 10 }}></Text>
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

              {/* Botão para confirmar ocupação */}
              <TouchableOpacity
                style={styles.enabledButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={{ color: "white" }}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.enabledButton}
              onPress={ativarMesa} // Chama a função ativarMesa ao pressionar o botão
              disabled={!isDesativarVisible}
            >
              <Text style={{ color: "white" }}>Ativar Mesa</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default NomeClienteModal;
