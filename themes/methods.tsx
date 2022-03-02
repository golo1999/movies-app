// Models
import { Movie } from "../models/Movie";

export const getFormattedMovieGenresList = (genresList: string[]): string => {
  const genresListLength = genresList.length;

  let formattedGenresList = ``;

  genresList.forEach((genre, index) => {
    formattedGenresList = formattedGenresList.concat(genre);

    if (index < genresListLength - 1) {
      formattedGenresList = formattedGenresList.concat(` / `);
    }
  });

  return formattedGenresList;
};

export const getMovieGenresList = (moviesList: Movie[]): string[] => {
  let genresList: string[] = [];

  moviesList.forEach((movie) => {
    const { genres } = movie;

    genres.forEach((genre) => {
      if (!genresList.includes(genre)) {
        genresList.push(genre);
      }
    });
  });

  genresList = genresList.sort();

  return genresList;
};

export const getMoviesListByGenre = (
  moviesList: Movie[],
  searchedGenre: string
): Movie[] => {
  let filteredMoviesList: Movie[] = [];

  // moviesList.forEach((movie) => {
  //   const { genres: genresList } = movie;

  //   genresList.forEach((genre) => {});
  // });

  filteredMoviesList = moviesList.filter((movie) =>
    movie.genres.includes(searchedGenre)
  );

  return filteredMoviesList;
};
