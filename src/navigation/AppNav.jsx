import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";

import AppStack from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const AppNav = () => {
  const navigation = useNavigation();

  return (
    <NavigationContainer independent={true}>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNav;
