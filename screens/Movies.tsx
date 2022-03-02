// Standard packages
import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { fetchMoviesList } from "../store/movies-list-actions";
import { moviesListActions } from "../store/movies-list-slice";

// Components
import MoviesList from "../components/MoviesList/MoviesList";

// Models
import { Movie } from "../models/Movie";

import { getMoviesListByGenre } from "../themes/methods";

const Movies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesListActions.clearMoviesList());
    dispatch(fetchMoviesList());
  }, [dispatch]);

  const moviesList: Movie[] = useSelector(
    (state: RootStateOrAny) => state.moviesList.moviesList
  );

  console.log("WAR MOVIES");
  console.log(getMoviesListByGenre(moviesList, "War").length);

  return <MoviesList moviesList={moviesList} />;
};

export default Movies;
