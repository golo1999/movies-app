// Standard packages
import axios from "axios";
import React, { useCallback, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

// Redux
import { fetchFavoriteMoviesList } from "../store/favorite-movies-list-actions";
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
      dispatch(favoriteMoviesListActions.clearFavoriteMoviesList());
      dispatch(fetchFavoriteMoviesList(databaseURL, currentUser.id));
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const cancelTokenSource = axios.CancelToken.source();

      axios
        .get(`${databaseURL}/users/${currentUser.id}/favoriteMovies.json`, {
          cancelToken: cancelTokenSource.token,
        })
        .then((response) =>
          response.data
            ? Object.entries<(string | number)[][]>(response.data).length
            : 0
        )
        .then((numberOfFavoriteMovies) =>
          setNumberOfFavoriteMovies(numberOfFavoriteMovies)
        );

      return () =>
        cancelTokenSource.cancel(
          "Cancelled fetching number of favorite movies"
        );
    }, [])
  );

  const favoriteMoviesList: Movie[] = useSelector(
    (state: RootStateOrAny) => state.favoriteMoviesList.favoriteMoviesList
  );

  return (
    <MoviesList
      loadingMessage="Fetching favorite movies..."
      moviesList={favoriteMoviesList}
      noDataMessage="No data found..."
      numberOfMovies={numberOfFavoriteMovies}
    />
  );
};

export default FavoriteMovies;
