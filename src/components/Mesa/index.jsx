import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Mesa = ({ id, estado, estaAtiva, onMesaPress }) => {
  const cor = estaAtiva ? (estado === "LIVRE" ? "green" : "#e74c3c") : "gray";

  return (
    <TouchableOpacity
      onPress={() => onMesaPress(id, estado, estaAtiva)}
      style={{ width: "27%", margin: 10, padding: 20, backgroundColor: cor }}
    >
      <Text style={{ textAlign: "center" }}>{id}</Text>
    </TouchableOpacity>
  );
};

export default Mesa;
