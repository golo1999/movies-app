// Standard packages
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Screens
import Authentication from "../screens/Authentication";
import MovieGenres from "../screens/MovieGenres";
import MoviesFilteredByGenre from "../screens/MoviesFilteredByGenre";

// Firebase
import { signOutUser } from "../firebase/firebase-methods";

// Components
import CustomHeader from "../components/CustomHeader";
import MovieDetails from "../screens/MovieDetails";

// Models
import { User } from "../models/User";

export type MovieCategoriesStackParamsList = {
  Authentication: undefined;
  MovieDetails: undefined;
  MovieGenres: undefined;
  MoviesFilteredByGenre: undefined;
};

type MovieCategoriesStackScreenProp = NativeStackNavigationProp<
  MovieCategoriesStackParamsList,
  "MovieGenres"
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

  const openDrawerHandler = (navigation: MovieCategoriesStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="MovieGenres">
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
        name="MovieDetails"
        component={MovieDetails}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "arrow-back",
                onPress: () => goBackHandler(navigation),
              }}
              headerRight={{
                iconName: "star-outline",
                onPress: () => {
                  if (userIsAuthenticated) {
                    alert("Added to favorites");
                  } else {
                    loginRedirectHandler(navigation);
                  }
                },
              }}
              title="Movie details"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MovieGenres"
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
        options={({ navigation, route }) => ({
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
                    signOutUser({ dispatch });
                  }
                },
              }}
              title={`${route.params?.genre} movies`}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MovieCategoriesStack;
