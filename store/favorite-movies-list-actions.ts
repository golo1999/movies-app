// Standard packages
import axios from "axios";
import { Dispatch } from "redux";

// Redux
import { favoriteMoviesListActions } from "./favorite-movies-list-slice";

// Models
import { Movie } from "../models/Movie";

// Variables
import { MOVIE_DETAILS_URL as movieDetailsURL } from "../environment/theme/Variables";

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
    const fetchFavoriteMoviesIDsList = async () => {
      const response = await axios.get(
        `${databaseURL}/users/${userId}/favoriteMovies.json`
      );

      return await response.data;
    };

    const fetchFavoriteMovieDetails = async (favoriteMovieId: number) => {
      const response = await axios.get(
        `${movieDetailsURL}?movie_id=${favoriteMovieId}`
      );

      const data = await response.data;

      return data;
    };

    try {
      Object.entries(await fetchFavoriteMoviesIDsList()).forEach(
        async (idsListEntries: [string, any]) => {
          const movieId: number = idsListEntries[1];

          const fetchedMovieDetailsList = await fetchFavoriteMovieDetails(
            movieId
          );

          const fetchedMovie = new Movie(fetchedMovieDetailsList.data.movie);

          // console.log(fetchedMovie.title);
          dispatch(
            favoriteMoviesListActions.addFavoriteMovie({
              favoriteMovie: fetchedMovie,
            })
          );
        }
      );
    } catch (error) {}
  };
};

export const getFavoriteMovieKey = async (
  databaseURL: string,
  userId: string,
  searchedMovieId: number
): Promise<string> => {
  const response = await axios.get(
    `${databaseURL}/users/${userId}/favoriteMovies.json`
  );

  const favoriteMoviesList: (string | number)[][] = Object.entries(
    await response.data
  );

  let favoriteMovieKey = "";

  favoriteMoviesList.forEach((favoriteMovie: (string | number)[]) => {
    const favoriteMoviesListValues = Object.values(favoriteMovie);

    if (favoriteMoviesListValues.includes(searchedMovieId)) {
      favoriteMovieKey = favoriteMoviesListValues[0].toString();
    }
  });

  return favoriteMovieKey;
};

export const getFavoriteMoviesListLength = async (
  databaseURL: string,
  userId: string
): Promise<number> => {
  const response = await axios.get(
    `${databaseURL}/users/${userId}/favoriteMovies.json`
  );

  const responseData = response.data;

  return responseData
    ? Object.entries<(string | number)[][]>(responseData).length
    : 0;
};
