// Standard packages
import React, { useCallback, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

// Redux
import {
  fetchFavoriteMoviesList,
  getFavoriteMoviesListLength,
} from "../store/favorite-movies-list-actions";
import { favoriteMoviesListActions } from "../store/favorite-movies-list-slice";

// Components
import MoviesList from "../components/MoviesList/MoviesList";

// Models
import { Movie } from "../models/Movie";
import { User } from "../models/User";

// Environment variables
import { DATABASE_URL as databaseURL } from "@env";

const FavoriteMovies = () => {
  const [numberOfFavoriteMovies, setNumberOfFavoriteMovies] = useState(-1);

  const dispatch = useDispatch();

  const currentUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  useFocusEffect(
    useCallback(() => {
      getFavoriteMoviesListLength(databaseURL, currentUser.id).then((result) =>
        setNumberOfFavoriteMovies(result)
      );
      dispatch(favoriteMoviesListActions.clearFavoriteMoviesList());
      dispatch(fetchFavoriteMoviesList(databaseURL, currentUser.id));
    }, [])
  );

  const favoriteMoviesList: Movie[] = useSelector(
    (state: RootStateOrAny) => state.favoriteMoviesList.favoriteMoviesList
  );

  return (
    <MoviesList
      loadingMessage="Fetching favorite movies..."
      moviesList={favoriteMoviesList}
      numberOfMovies={numberOfFavoriteMovies}
    />
  );
};

export default FavoriteMovies;
