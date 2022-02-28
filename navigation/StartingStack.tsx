// Standard packages
import React from "react";
import { Icon } from "react-native-elements";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { RootStateOrAny, useSelector } from "react-redux";

// Navigation
import MoviesDrawer from "./MoviesDrawer";
import MyDrawerNavigator from "./myDrawerNavigator";

// Components
import Authentication from "../screens/Authentication";
import CustomHeader from "../components/CustomHeader";
import MovieDetails from "../screens/MovieDetails";
import Movies from "../screens/Movies";
import SplashScreen from "../screens/SplashScreen";

// Models
import { User } from "../models/User";

// Variables
import { COLORS } from "../themes/variables";

export type StartingStackParamsList = {
  MoviesDrawer: undefined;
  SplashScreen: undefined;
};

const Stack = createNativeStackNavigator<StartingStackParamsList>();

export const StartingStack = () => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  console.log(`auth`);
  console.log(userIsAuthenticated);
  console.log(authenticatedUser);

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MoviesDrawer" component={MoviesDrawer} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default StartingStack;
