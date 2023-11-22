import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import store from "./store";
import { Provider } from "react-redux";

import AppNav from "./src/navigation/AppNav";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <NavigationContainer independent={true}>
          <AppNav />
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
}
