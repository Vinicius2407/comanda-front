import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (userToken !== null) {
      navigation.navigate("Login");
    }
  }, [userToken]);

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>;
  }

  return (
    <NavigationContainer independent={true}>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNav;
