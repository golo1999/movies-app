// Standard packages
import axios from "axios";
import { Dispatch } from "redux";

// Redux
import { favoriteMoviesListActions } from "./favorite-movies-list-slice";

// Models
import { Movie } from "../models/Movie";

export const checkIfMovieIsAddedToFavorites = async (
  databaseURL: string,
  userId: string,
  searchedMovieId: number
): Promise<boolean | undefined> => {
  const response = await axios.get(
    `${databaseURL}/users/${userId}/favoriteMovies.json`
  );

  if (!response.data) {
    return;
  }

  const favoriteMoviesIDsList: number[] = Object.values(await response.data);

  const filteredFavoriteMoviesIDsList = favoriteMoviesIDsList.filter(
    (movieId) => movieId === searchedMovieId
  );

  return filteredFavoriteMoviesIDsList.length > 0;
};

export const fetchFavoriteMoviesList = (
  databaseURL: string,
  userId: string
) => {
  return async (dispatch: Dispatch<any>) => {
    const fetchFavoriteMoviesIDsList = async (): Promise<number[]> => {
      const response = await axios.get(
        `${databaseURL}/users/${userId}/favoriteMovies.json`
      );

      const data = await response.data;

      if (!data.data) {
        console.log("nothing");
      }

      console.log("fetchFavoriteMoviesIDsList");
      console.log(data);

      return data;
    };

    const fetchFavoriteMovieDetails = async (
      favoriteMovieId: number
    ): Promise<Movie[]> => {
      const response = await axios.get(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${favoriteMovieId}`
      );

      const data = await response.data;

      return data;
    };

    try {
      const favoriteMoviesIDsList = await fetchFavoriteMoviesIDsList();

      favoriteMoviesIDsList.forEach((movieId) => {
        console.log(movieId);
      });
    } catch (error) {}
  };
};

export const getMovieFavoritesId = async (
  databaseURL: string,
  userId: string,
  searchedMovieId: number
): Promise<string> => {
  const response = await axios.get(
    `${databaseURL}/users/${userId}/favoriteMovies.json`
  );

  const favoriteMoviesList = await response.data;

  console.log(favoriteMoviesList.l0ibdkgzm93bcdwbvhb);

  return "";
};
