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
