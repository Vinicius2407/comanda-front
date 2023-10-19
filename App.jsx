import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/routes";
import store from "./store";
import { Provider } from "react-redux";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <AppNav />
      </NavigationContainer>
    </AuthProvider>
  );
}
