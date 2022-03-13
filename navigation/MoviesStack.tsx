// Standard packages
import React, { useState } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { checkIfMovieIsAddedToFavorites } from "../store/favorite-movies-list-actions";

// Firebase
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
  signOutUser,
} from "../firebase/firebase-methods";

// Screens
import Authentication from "../screens/Authentication/Authentication";
import Movies from "../screens/Movies";
import MovieDetails from "../screens/MovieDetails";

// Components
import CustomHeader from "../components/CustomHeader/CustomHeader";

// Models
import { Movie } from "../models/Movie";
import { User } from "../models/User";

// Environment variables
import { DATABASE_URL as databaseURL } from "@env";

export type MoviesStackParamsList = {
  Authentication: undefined;
  Movies: undefined;
  MovieDetails: undefined;
};

type MoviesStackScreenProp = NativeStackNavigationProp<
  MoviesStackParamsList,
  "Movies"
>;

const Stack = createNativeStackNavigator<MoviesStackParamsList>();

export const MoviesStack = () => {
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

  const goBackHandler = (navigation: MoviesStackScreenProp) => {
    navigation.goBack();
  };

  const loginRedirectHandler = (navigation: MoviesStackScreenProp) => {
    navigation.navigate("Authentication");
  };

  const openDrawerHandler = (navigation: MoviesStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="Movies">
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
        name="Movies"
        component={Movies}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "menu",
                onPress: () => openDrawerHandler(navigation),
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
              title="Movies"
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
                  if (userIsAuthenticated) {
                    if (!movieIsAddedToFavorites) {
                      addMovieToFavorites({
                        movieId: selectedMovie.id,
                        onSuccess: () =>
                          setMovieIsAddedToFavorites(
                            (previousValue) => !previousValue
                          ),
                        userId: authenticatedUser.id,
                      });
                    } else {
                      removeMovieFromFavorites({
                        movieId: selectedMovie.id,
                        onSuccess: () =>
                          setMovieIsAddedToFavorites(
                            (previousValue) => !previousValue
                          ),
                        userId: authenticatedUser.id,
                      });
                    }
                  } else {
                    loginRedirectHandler(navigation);
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

export default MoviesStack;
