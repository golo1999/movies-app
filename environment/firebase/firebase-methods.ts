// Standard packages
import { Dispatch } from "@reduxjs/toolkit";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  Persistence,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { onValue, ref, remove, set } from "firebase/database";
import { Alert, GestureResponderEvent } from "react-native";

// Redux
import { authActions } from "../../store/auth-slice";
import {
  checkIfMovieIsAddedToFavorites,
  getFavoriteMovieKey,
} from "../../store/favorite-movies-list-actions";

// Firebase
import { auth, db } from "./firebase";
import {
  COULD_NOT_SIGN_OUT,
  EMAIL_ALREADY_IN_USE,
  EMAIL_NOT_VERIFIED,
  PLEASE_CHECK_YOUR_EMAIL,
  PLEASE_TRY_AGAIN,
  TOO_MANY_REQUESTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "./firebase-errors";

// Methods
import {
  createPersonalInformationPath,
  generateRandomUUID,
} from "../theme/Methods";

// Models
import { User } from "../../models/User";

// Environment variables
import { DATABASE_URL as databaseURL } from "@env";

interface AddMovieToFavoritesProps {
  movieId: number;
  onSuccess: () => void;
  userId: string;
}

interface AuthenticateUserProps {
  dispatch: Dispatch<any>;
  email: string;
  goBackHandler: () => void;
  password: string;
  rememberMe: boolean;
}

interface RegisterUserProps {
  email: string;
  name: string;
  password: string;
  redirectToLoginHandler: () => void;
}

interface RemoveMovieFromFavoritesProps {
  movieId: number;
  onSuccess: () => void;
  userId: string;
}

interface ResetPasswordProps {
  email: string;
  redirectToLoginHandler: () => void;
}

interface SignOutUserProps {
  dispatch: Dispatch<any>;
}

export const addMovieToFavorites = ({
  movieId,
  onSuccess,
  userId,
}: AddMovieToFavoritesProps) => {
  checkIfMovieIsAddedToFavorites(databaseURL, userId, movieId).then(
    (checkResult) => {
      if (!!checkResult) {
        return;
      }

      set(
        ref(db, `users/${userId}/favoriteMovies/${generateRandomUUID()}`),
        movieId
      ).then(() => onSuccess());
    }
  );
};

export const authenticateUser = ({
  dispatch,
  email,
  goBackHandler,
  password,
  rememberMe,
}: AuthenticateUserProps) => {
  // const PERSISTENCE = rememberMe
  //   ? browserLocalPersistence
  //   : browserSessionPersistence;

  // setPersistence(auth, PERSISTENCE)
  //   .then(() => {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         const user = userCredential.user;

  //         if (!user || !user.emailVerified) {
  //           return;
  //         }

  //         onValue(
  //           ref(db, `users/${user.uid}/personalInformation`),
  //           (snapshot) => {
  //             const userPersonalInformation: User = snapshot.val();

  //             dispatch(
  //               authActions.setAuthenticatedUser({
  //                 authenticatedUser: userPersonalInformation,
  //               })
  //             );
  //             goBackHandler();
  //           }
  //         );
  //       })
  //       .catch((error) => console.log(error));
  //   })
  //   .catch((error) => console.log(error));

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (!user) {
        throw new Error(PLEASE_TRY_AGAIN.errorCode);
      }

      if (!user.emailVerified) {
        throw new Error(EMAIL_NOT_VERIFIED.errorCode);
      }

      onValue(ref(db, `users/${user.uid}/personalInformation`), (snapshot) => {
        const userPersonalInformation: User = snapshot.val();

        dispatch(
          authActions.setAuthenticatedUser({
            authenticatedUser: userPersonalInformation,
          })
        );
        goBackHandler();
      });
    })
    .catch((error) => {
      let errorMessage;
      let errorMessageTitle;

      switch (error.code) {
        case EMAIL_NOT_VERIFIED.errorCode:
          errorMessage = EMAIL_NOT_VERIFIED.userMessage;
          errorMessageTitle = EMAIL_NOT_VERIFIED.userMessageTitle;
          break;
        case TOO_MANY_REQUESTS.errorCode:
          errorMessage = TOO_MANY_REQUESTS.userMessage;
          errorMessageTitle = TOO_MANY_REQUESTS.userMessageTitle;
          break;
        case USER_NOT_FOUND.errorCode:
          errorMessage = USER_NOT_FOUND.userMessage;
          errorMessageTitle = USER_NOT_FOUND.userMessageTitle;
          break;
        case WRONG_PASSWORD.errorCode:
          errorMessage = WRONG_PASSWORD.userMessage;
          errorMessageTitle = WRONG_PASSWORD.userMessageTitle;
          break;
        default:
          errorMessage = PLEASE_TRY_AGAIN.userMessage;
          errorMessageTitle = PLEASE_TRY_AGAIN.userMessageTitle;
          break;
      }

      Alert.alert(errorMessageTitle, errorMessage);
    });
};

export const registerUser = ({
  email,
  name,
  password,
  redirectToLoginHandler,
}: RegisterUserProps) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (!user) {
        return;
      }

      sendEmailVerification(user).then(() => {
        Alert.alert(
          PLEASE_CHECK_YOUR_EMAIL.userMessageTitle,
          PLEASE_CHECK_YOUR_EMAIL.userMessage
        );

        createPersonalInformationPath(new User({ email, id: user.uid, name }));
        redirectToLoginHandler();
      });
    })
    .catch((error: Error) => {
      if (error.message === EMAIL_ALREADY_IN_USE.errorCode) {
        Alert.alert(
          EMAIL_ALREADY_IN_USE.userMessageTitle,
          EMAIL_ALREADY_IN_USE.userMessage
        );
      }
    });
};

export const removeMovieFromFavorites = ({
  movieId,
  onSuccess,
  userId,
}: RemoveMovieFromFavoritesProps) => {
  checkIfMovieIsAddedToFavorites(databaseURL, userId, movieId).then(
    (checkResult) => {
      if (!!!checkResult) {
        return;
      }

      getFavoriteMovieKey(databaseURL, userId, movieId).then(
        (favoriteMovieKeyResult) => {
          if (favoriteMovieKeyResult.trim().length > 0) {
            remove(
              ref(
                db,
                `users/${userId}/favoriteMovies/${favoriteMovieKeyResult}`
              )
            ).then(() => onSuccess());
          }
        }
      );
    }
  );
};

export const resetPassword = ({
  email,
  redirectToLoginHandler,
}: ResetPasswordProps) => {
  sendPasswordResetEmail(auth, email)
    .then(() => redirectToLoginHandler())
    .catch((error) => {
      let errorMessage;
      let errorMessageTitle;

      switch (error.code) {
        case EMAIL_NOT_VERIFIED.errorCode:
          errorMessage = EMAIL_NOT_VERIFIED.userMessage;
          errorMessageTitle = EMAIL_NOT_VERIFIED.userMessageTitle;
          break;
        case TOO_MANY_REQUESTS.errorCode:
          errorMessage = TOO_MANY_REQUESTS.userMessage;
          errorMessageTitle = TOO_MANY_REQUESTS.userMessageTitle;
          break;
        case USER_NOT_FOUND.errorCode:
          errorMessage = USER_NOT_FOUND.userMessage;
          errorMessageTitle = USER_NOT_FOUND.userMessageTitle;
          break;
        default:
          errorMessage = PLEASE_TRY_AGAIN.userMessage;
          errorMessageTitle = PLEASE_TRY_AGAIN.userMessageTitle;
          break;
      }

      Alert.alert(errorMessageTitle, errorMessage);
    });
};

export const signOutUser = ({ dispatch }: SignOutUserProps) => {
  signOut(auth)
    .then(() => {
      dispatch(authActions.clearAuthenticatedUser());
    })
    .catch(() => {
      Alert.alert(
        COULD_NOT_SIGN_OUT.userMessageTitle,
        COULD_NOT_SIGN_OUT.userMessage
      );
    });
};
