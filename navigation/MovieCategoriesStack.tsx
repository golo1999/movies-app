// Standard packages
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { authActions } from "../store/auth-slice";

// Screens
import Authentication from "../screens/Authentication";
import MovieGenres from "../screens/MovieGenres";
import MoviesFilteredByGenre from "../screens/MoviesFilteredByGenre";

// Components
import CustomHeader from "../components/CustomHeader";

// Models
import { User } from "../models/User";

export type MovieCategoriesStackParamsList = {
  Authentication: undefined;
  MovieCategories: undefined;
  MoviesFilteredByGenre: undefined;
};

type MovieCategoriesStackScreenProp = NativeStackNavigationProp<
  MovieCategoriesStackParamsList,
  "MovieCategories"
>;

const Stack = createNativeStackNavigator<MovieCategoriesStackParamsList>();

export const MovieCategoriesStack = () => {
  const dispatch = useDispatch();

  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  const goBackHandler = (navigation: MovieCategoriesStackScreenProp) => {
    navigation.goBack();
  };

  const loginRedirectHandler = (navigation: MovieCategoriesStackScreenProp) => {
    navigation.navigate("Authentication");
  };

  const logoutHandler = () => {
    dispatch(authActions.clearAuthenticatedUser());
    alert("logged out");
  };

  const openDrawerHandler = (navigation: MovieCategoriesStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="MovieCategories">
      <Stack.Screen
        name="Authentication"
        component={Authentication}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "arrow-back",
                onPress: () => goBackHandler(navigation),
              }}
              title="Authentication"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MovieCategories"
        component={MovieGenres}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "menu",
                onPress: () => openDrawerHandler(navigation),
              }}
              title="Categories"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MoviesFilteredByGenre"
        component={MoviesFilteredByGenre}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "arrow-back",
                onPress: () => goBackHandler(navigation),
              }}
              headerRight={{
                iconName: userIsAuthenticated ? "logout" : "login",
                onPress: () => {
                  if (!userIsAuthenticated) {
                    loginRedirectHandler(navigation);
                  } else {
                    logoutHandler();
                  }
                },
              }}
              title="Filtered movies"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MovieCategoriesStack;
