// Standard packages
import axios from "axios";
import { Dispatch } from "redux";

// Redux
import { moviesListActions } from "./movies-list-slice";

// Models
import { Movie } from "../models/Movie";

// Variables
import { MOVIES_LIST_URL as moviesListURL } from "../themes/variables";

export const fetchMoviesList = () => {
  return async (dispatch: Dispatch<any>) => {
    const fetchData = async () => {
      const response = await axios.get(moviesListURL);

      const data = await response.data;

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
  const response = await fetch(moviesListURL);

  if (!response.ok) {
    console.log("Error fetching number of movies");
  }

  const fetchedData = await response.json();

  const moviesData = fetchedData.data;

  const moviesList: Movie[] = Object.values(moviesData.movies);

  return moviesList.length;
};
