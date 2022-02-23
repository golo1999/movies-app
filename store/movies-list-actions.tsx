// Standard packages
import { Dispatch } from "redux";

// Redux
import { moviesListActions } from "./movies-list-slice";

// Models
import { Movie } from "../models/Movie";

export const fetchMoviesList = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`https://yts.mx/api/v2/list_movies.json`);

      const data = await response.json();

      return data;
    };

    try {
      const fetchedData = await fetchData();

      const moviesData = fetchedData.data;

      const moviesList: Movie[] = Object.values(moviesData.movies);

      moviesList.forEach((movie) => {
        dispatch(moviesListActions.addMovie({ movie }));
      });
    } catch (error: any) {}
  };
};

export const getTotalNumberOfMovies = async () => {
  const response = await fetch(`https://yts.mx/api/v2/list_movies.json`);

  if (!response.ok) {
    console.log(`error fetching number of movies`);
  }

  const fetchedData = await response.json();

  const moviesData = fetchedData.data;

  const moviesList: Movie[] = Object.values(moviesData.movies);

  return moviesList.length;
};
