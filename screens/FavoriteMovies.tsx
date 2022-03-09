// Standard packages
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { fetchFavoriteMoviesList } from "../store/favorite-movies-list-actions";

// Models
import { User } from "../models/User";

// Environment variables
import { DATABASE_URL as databaseURL } from "@env";

const FavoriteMovies = () => {
  const dispatch = useDispatch();

  const currentUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  useEffect(() => {
    dispatch(fetchFavoriteMoviesList(databaseURL, currentUser.id));
  }, [databaseURL, dispatch, fetchFavoriteMoviesList]);

  return (
    <View>
      <Text>FavoriteMovies</Text>
    </View>
  );
};

export default FavoriteMovies;
