import {
  View,
  StyleSheet,
  Image,
  Input,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { user_login } from "../../services/user_api";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const Mesas = ({ navigation }) => {
  const [active, setActive] = useState(false);
  const Press1 = () => setActive(!active);

  const buttonColor = {
    backgroundColor: active ? "green" : "red",
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={Press1}>
          <Text>1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={Press1}>
          <Text>2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} backgroundColor={buttonColor}>
          <Text>3</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} color={buttonColor}>
          <Text>4</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 100,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 36,
    justifyContent: "space-between",
  },
});

export default Mesas;
