export const emailIsValid = (email: string | undefined): boolean => {
  const expression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return typeof email === `undefined`
    ? false
    : expression.test(String(email).trim().toLowerCase());
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

export const nameIsValid = (name: string | undefined): boolean => {
  const expression = /^[a-z- \xC0-\xFF]+$/i;

  if (typeof name === `undefined`) {
    return false;
  }

  return expression.test(String(name).trim());
};

export const passwordIsValid = (password: string): boolean => {
  return password.length >= 8;
};
