// Standard packages
import "react-native-gesture-handler";
import React from "react";
import { LogBox, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

// Redux store
import { store } from "./store";

// Navigation
import AppStack from "./navigation/AppStack";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default App;
