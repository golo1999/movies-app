// Standard packages
import { DrawerActions } from "@react-navigation/native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { checkIfMovieIsAddedToFavorites } from "../store/favorite-movies-list-actions";

// Screens
import Authentication from "../screens/Authentication/Authentication";
import MovieGenres from "../screens/MovieGenres/MovieGenres";
import MoviesFilteredByGenre from "../screens/MoviesFilteredByGenre";

// Firebase
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
  signOutUser,
} from "../environment/firebase/firebase-methods";

// Components
import CustomHeader from "../components/CustomHeader/CustomHeader";
import MovieDetails from "../screens/MovieDetails/MovieDetails";

// Models
import { Movie } from "../models/Movie";
import { User } from "../models/User";

// Environment variables
import { DATABASE_URL as databaseURL } from "@env";

export type MovieCategoriesStackParamsList = {
  Authentication: undefined;
  MovieDetails: undefined;
  MovieGenres: undefined;
  MoviesFilteredByGenre: undefined;
};

const Stack = createNativeStackNavigator<MovieCategoriesStackParamsList>();

export const MovieCategoriesStack = () => {
  const [movieIsAddedToFavorites, setMovieIsAddedToFavorites] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const selectedMovie: Movie = useSelector(
    (state: RootStateOrAny) => state.selectedMovie.selectedMovie
  );

  checkIfMovieIsAddedToFavorites(
    databaseURL,
    authenticatedUser.id,
    selectedMovie.id
  ).then((result) => {
    setMovieIsAddedToFavorites(!!result);
  });

  const starIcon = movieIsAddedToFavorites ? "star" : "star-outline";

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

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
                onPress: () => navigation.goBack(),
              }}
              title="Authentication"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MovieDetails"
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "arrow-back",
                onPress: () => navigation.goBack(),
              }}
              headerRight={{
                iconName: starIcon,
                onPress: () => {
                  if (userIsAuthenticated && !movieIsAddedToFavorites) {
                    addMovieToFavorites({
                      movieId: selectedMovie.id,
                      onSuccess: () =>
                        setMovieIsAddedToFavorites(
                          (previousValue) => !previousValue
                        ),
                      userId: authenticatedUser.id,
                    });
                  }

                  if (userIsAuthenticated && movieIsAddedToFavorites) {
                    removeMovieFromFavorites({
                      movieId: selectedMovie.id,
                      onSuccess: () =>
                        setMovieIsAddedToFavorites(
                          (previousValue) => !previousValue
                        ),
                      userId: authenticatedUser.id,
                    });
                  }

                  if (!userIsAuthenticated) {
                    navigation.navigate("Authentication");
                  }
                },
              }}
              title="Movie details"
            />
          ),
        })}
      >
        {() => <MovieDetails addedToFavorites={movieIsAddedToFavorites} />}
      </Stack.Screen>
      <Stack.Screen
        name="MovieGenres"
        component={MovieGenres}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "menu",
                onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
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
                onPress: () => navigation.goBack(),
              }}
              headerRight={{
                iconName: userIsAuthenticated ? "logout" : "login",
                onPress: () => {
                  if (!userIsAuthenticated) {
                    navigation.navigate("Authentication");
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
