// Standard packages
import "react-native-gesture-handler";
import React from "react";
import { LogBox, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

// Redux store
import { store } from "./store";

// Navigation
import MyDrawerNavigator from "./navigation/myDrawerNavigator";
import MyStackNavigator from "./navigation/myStackNavigator";
import StartingStack from "./navigation/StartingStack";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <NavigationContainer>
        <StartingStack />
      </NavigationContainer>
    </Provider>
  );
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default App;
