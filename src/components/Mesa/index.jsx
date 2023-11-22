import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Mesa = ({ id, estado, estaAtiva, onMesaPress }) => {
  const cor = estado === "LIVRE" ? "green" : "red";

  return (
    <TouchableOpacity
      onPress={() => onMesaPress(id, estaAtiva)}
      style={{ width: "30%", margin: 10, padding: 20, backgroundColor: cor }}
    >
      <Text style={{ textAlign: "center" }}>{id}</Text>
    </TouchableOpacity>
  );
};

export default Mesa;
