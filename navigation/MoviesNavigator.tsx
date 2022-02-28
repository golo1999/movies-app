// Standard packages
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

// Components
import Movies from "../screens/Movies";

export type MoviesStackParamsList = {
  Movies: undefined;
};

type MoviesScreenProp = NativeStackNavigationProp<
  MoviesStackParamsList,
  "Movies"
>;

const Stack = createNativeStackNavigator<MoviesStackParamsList>();

const MoviesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Movies"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Movies" component={Movies} />
    </Stack.Navigator>
  );
};

export default MoviesNavigator;

const styles = StyleSheet.create({});
