import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Home from "../screens/Home";

import Mesas from "../screens/Mesas";
import Lista from "../screens/Lista";
import UpdateScreen from "../screens/UpdateScreen";
import Comanda from "../screens/Comanda";
import LogoutComponent from "../components/Logout";
import Cardapio from "../screens/Cardapio";
import addCardapio from "../screens/addCardapio";

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

      <Stack.Screen
        name="Mesas"
        component={Mesas}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Lista"
        component={Lista}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UpdateScreen"
        component={UpdateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comanda"
        component={Comanda}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Logout"
        component={LogoutComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="addCardapio"
        component={addCardapio}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
