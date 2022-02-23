// Standard packages
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import Authentication from "../screens/Authentication";
import MovieDetails from "../screens/MovieDetails";
import Movies from "../screens/Movies";
import Registration from "../screens/Registration";

// Variables
import { colors } from "../themes/variables";

export type RootStackParamsList = {
  Authentication: undefined;
  Movies: undefined;
  MovieDetails: undefined;
  Registration: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const MyStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{ contentStyle: { backgroundColor: colors.PRIMARY } }}
      >
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStackNavigator;
