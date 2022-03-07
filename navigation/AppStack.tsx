// Standard packages
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { fetchAuthenticatedUser } from "../store/auth-actions";

// Navigation
import MoviesDrawer from "./MoviesDrawer";

// Components
import SplashScreen from "../screens/SplashScreen";

// Models
import { User } from "../models/User";

export type AppStackParamsList = {
  MoviesDrawer: undefined;
  SplashScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamsList>();

export const AppStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthenticatedUser());
  }, [dispatch]);

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

export default AppStack;
