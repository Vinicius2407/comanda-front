import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Cardapio from "../screens/Cardapio";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cardapio"
        component={Cardapio}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
