// Standard packages
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { fetchMoviesList } from "../store/movies-list-actions";
import { moviesListActions } from "../store/movies-list-slice";

// Components
import MoviesList from "../components/MoviesList/MoviesList";

// Models
import { Movie } from "../models/Movie";

const Movies = () => {
  const [numberOfMovies, setNumberOfMovies] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesListActions.clearMoviesList());
    dispatch(fetchMoviesList());
  }, [dispatch]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get("https://yts.mx/api/v2/list_movies.json", {
        cancelToken: cancelTokenSource.token,
      })
      .then((response) =>
        response.data
          ? (Object.values(response.data.data.movies) as Movie[]).length
          : 0
      )
      .then((moviesListLength) => {
        setNumberOfMovies(moviesListLength);
      });

    return () =>
      cancelTokenSource.cancel("Cancelled fetching number of movies");
  }, []);

  const moviesList: Movie[] = useSelector(
    (state: RootStateOrAny) => state.moviesList.moviesList
  );

  return (
    <MoviesList
      loadingMessage="Fetching data..."
      moviesList={moviesList}
      noDataMessage="No data found..."
      numberOfMovies={numberOfMovies}
    />
  );
};

export default Movies;
