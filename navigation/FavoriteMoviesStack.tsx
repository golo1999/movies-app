// Standard packages
import { DrawerActions } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

// Redux
import { checkIfMovieIsAddedToFavorites } from "../store/favorite-movies-list-actions";

// Firebase
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from "../firebase/firebase-methods";

// Screens
import FavoriteMovies from "../screens/FavoriteMovies";
import MovieDetails from "../screens/MovieDetails/MovieDetails";

// Components
import CustomHeader from "../components/CustomHeader/CustomHeader";

// Models
import { Movie } from "../models/Movie";
import { User } from "../models/User";

// Environment variables
import { DATABASE_URL as databaseURL } from "@env";

export type FavoriteMoviesStackParamsList = {
  FavoriteMovies: undefined;
  MovieDetails: undefined;
};

type FavoriteMoviesStackScreenProp = NativeStackNavigationProp<
  FavoriteMoviesStackParamsList,
  "FavoriteMovies"
>;

const Stack = createNativeStackNavigator<FavoriteMoviesStackParamsList>();

const FavoriteMoviesStack = () => {
  const [movieIsAddedToFavorites, setMovieIsAddedToFavorites] =
    useState<boolean>(true);

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

  const goBackHandler = (navigation: FavoriteMoviesStackScreenProp) => {
    navigation.goBack();
  };

  const openDrawerHandler = (navigation: FavoriteMoviesStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="FavoriteMovies">
      <Stack.Screen
        component={FavoriteMovies}
        name="FavoriteMovies"
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "menu",
                onPress: () => openDrawerHandler(navigation),
              }}
              title="Favorite movies"
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
                onPress: () => goBackHandler(navigation),
              }}
              headerRight={{
                iconName: starIcon,
                onPress: () => {
                  if (movieIsAddedToFavorites) {
                    removeMovieFromFavorites({
                      movieId: selectedMovie.id,
                      onSuccess: () =>
                        setMovieIsAddedToFavorites(
                          (previousValue) => !previousValue
                        ),
                      userId: authenticatedUser.id,
                    });
                  } else {
                    addMovieToFavorites({
                      movieId: selectedMovie.id,
                      onSuccess: () =>
                        setMovieIsAddedToFavorites(
                          (previousValue) => !previousValue
                        ),
                      userId: authenticatedUser.id,
                    });
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
    </Stack.Navigator>
  );
};

export default FavoriteMoviesStack;
