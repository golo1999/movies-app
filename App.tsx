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
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Setting a timer for a long period of time",
]);

export default App;
