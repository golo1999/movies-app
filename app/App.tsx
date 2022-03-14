// Standard packages
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { LogBox, StatusBar } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

// Redux store
import { store } from "../store";

// Navigation
import AppStack from "../navigation/AppStack";

// Variables
import { ignoreLogsMessages } from "../environment/theme/Variables";

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
  ignoreLogsMessages.asyncStorageDeprecated,
  ignoreLogsMessages.reactNativeGestureHandler,
  ignoreLogsMessages.settingTimer,
]);

export default App;
