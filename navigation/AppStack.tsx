// Standard packages
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Redux
import { fetchAuthenticatedUser } from "../store/auth-actions";

// Navigation
import MoviesDrawer from "./MoviesDrawer";

// Components
import SplashScreen from "../screens/SplashScreen/SplashScreen";

export type AppStackParamsList = {
  MoviesDrawer: undefined;
  SplashScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamsList>();

export const AppStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthenticatedUser());
  }, [dispatch, fetchAuthenticatedUser]);

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

export default AppStack;
