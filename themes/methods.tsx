export const emailIsValid = (email: string): boolean => {
  return true;
};

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

export const loginIsValid = (email: string, password: string): boolean => {
  return emailIsValid(email) && passwordIsValid(password);
};

export const nameIsValid = (name: string): boolean => {
  const expression = /^[a-zA-Z]+$/;

  if (String(name).trim().length < 2) {
    return false;
  }

  return expression.test(String(name).trim());
};

export const passwordIsValid = (password: string): boolean => {
  return password.length >= 8;
};
