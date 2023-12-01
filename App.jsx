import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import store from "./store";
import { UserProvider } from "./src/context/UserContext";
import AppNav from "./src/navigation/AppNav";
import { ComandaProvider } from "./src/context/ComandaContext";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <UserProvider>
        <ComandaProvider>
          <NavigationContainer independent={true}>
            <AppNav />
          </NavigationContainer>
        </ComandaProvider>
      </UserProvider>
    </ApplicationProvider>
  );
}
