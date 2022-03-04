// Standard packages
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
    const abortController = new AbortController();

    fetch(`https://yts.mx/api/v2/list_movies.json`, {
      signal: abortController.signal,
    })
      .then((result) => {
        if (!result.ok) {
          throw Error(`Couldn't fetch movies list length...`);
        }

        return result.json();
      })
      .then((data) => {
        const moviesData = data.data;

        const moviesList: Movie[] = Object.values(moviesData.movies);

        setNumberOfMovies(moviesList.length);
      })
      .catch((error) => {
        if (error.name === `AbortError`) {
          console.log(`fetch aborted`);
        }
      });

    return () => abortController?.abort();
  }, []);

  const moviesList: Movie[] = useSelector(
    (state: RootStateOrAny) => state.moviesList.moviesList
  );

  return (
    <MoviesList
      loadingMessage="Fetching data..."
      moviesList={moviesList}
      numberOfMovies={numberOfMovies}
    />
  );
};

export default Movies;
