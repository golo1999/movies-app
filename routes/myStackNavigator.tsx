// Standard packages
import React from "react";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RootStateOrAny, useSelector } from "react-redux";

// Components
import Authentication from "../screens/Authentication";
import MovieDetails from "../screens/MovieDetails";
import Movies from "../screens/Movies";
import SplashScreen from "../screens/SplashScreen";

// Models
import { User } from "../models/User";

// Variables
import { COLORS } from "../themes/variables";

export type RootStackParamsList = {
  Authentication: undefined;
  Movies: undefined;
  MovieDetails: undefined;
  SplashScreen: undefined;
};

type MoviesListScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  `Movies`
>;

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const MyStackNavigator = () => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  console.log(`auth`);
  console.log(userIsAuthenticated);
  console.log(authenticatedUser);

  const logInHandler = (navigation: MoviesListScreenProp) => {
    navigation.navigate("Authentication");
  };

  const logOutHandler = () => {};

  const refreshMoviesListHandler = (navigation: MoviesListScreenProp) => {
    navigation.replace("Movies");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          contentStyle: { backgroundColor: COLORS.PRIMARY },
          headerStyle: { backgroundColor: COLORS.SECONDARY },
          headerTintColor: `white`,
          headerTitleAlign: `center`,
        }}
      >
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={({ navigation }) => ({
            headerRight: () => [
              userIsAuthenticated && (
                <Icon
                  color="white"
                  key="logout-icon"
                  name="logout"
                  onPress={logOutHandler}
                />
              ),
              !userIsAuthenticated && [
                <Icon
                  color="white"
                  key="login-icon"
                  name="login"
                  onPress={() => {
                    logInHandler(navigation);
                  }}
                />,
              ],
            ],
          })}
        />
        <Stack.Screen
          name="Movies"
          component={Movies}
          options={({ navigation }) => ({
            headerLeft: () => [
              <Icon
                color="white"
                key="refresh-icon"
                name="refresh"
                onPress={() => refreshMoviesListHandler(navigation)}
              />,
            ],
            headerRight: () => [
              userIsAuthenticated && (
                <Icon
                  color="white"
                  key="logout-icon"
                  name="logout"
                  onPress={logOutHandler}
                />
              ),
              !userIsAuthenticated && [
                <Icon
                  color="white"
                  key="login-icon"
                  name="login"
                  onPress={() => {
                    logInHandler(navigation);
                  }}
                />,
              ],
            ],
          })}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStackNavigator;
