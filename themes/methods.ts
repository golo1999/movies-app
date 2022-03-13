// Standard packages
import { ref, set } from "firebase/database";

// Components
import Toast from "react-native-toast-message";

// Models
import { Movie } from "../models/Movie";
import { User } from "../models/User";

// Firebase
import { db } from "../firebase/firebase";

// Props
interface ToastProps {
  message: string;
  title: string;
  type: string;
}

export const createPersonalInformationPath = (newUser: User) => {
  if (!newUser) {
    return;
  }

  const personalInformationRef = ref(
    db,
    `users/${newUser.id}/personalInformation`
  );

  set(personalInformationRef, newUser);
};

export const generateRandomUUID = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
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

  filteredMoviesList = moviesList.filter((movie) =>
    movie.genres.includes(searchedGenre)
  );

  return filteredMoviesList;
};

export const showToast = ({ message, title, type }: ToastProps) => {
  Toast.show({
    text1: title,
    text2: message,
    topOffset: 300,
    type,
    visibilityTime: 3000,
  });
};
