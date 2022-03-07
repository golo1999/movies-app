// Standard packages
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  Persistence,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { Alert } from "react-native";
import { Dispatch } from "@reduxjs/toolkit";

// Redux
import { authActions } from "../store/auth-slice";

// Firebase
import { auth, db } from "./firebase";
import {
  EMAIL_ALREADY_IN_USE,
  EMAIL_NOT_VERIFIED,
  PLEASE_TRY_AGAIN,
  TOO_MANY_REQUESTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "./firebase-errors";

// Methods
import { createPersonalInformationPath } from "../themes/methods";

// Models
import { User } from "../models/User";

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
  //       .catch();
  //   })
  //   .catch();

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

      switch (error.code) {
        case EMAIL_NOT_VERIFIED.errorCode:
          errorMessage = EMAIL_NOT_VERIFIED.userMessage;
          break;
        case USER_NOT_FOUND.errorCode:
          errorMessage = USER_NOT_FOUND.userMessage;
          break;
        case WRONG_PASSWORD.errorCode:
          errorMessage = WRONG_PASSWORD.userMessage;
          break;
        case TOO_MANY_REQUESTS.errorCode:
          errorMessage = TOO_MANY_REQUESTS.userMessage;
          break;
        default:
          errorMessage = PLEASE_TRY_AGAIN.userMessage;
          break;
      }

      Alert.alert("Oops...", errorMessage);

      console.log(error.code);
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
        Alert.alert("Email verification sent", "Please check your email");

        createPersonalInformationPath(new User({ email, id: user.uid, name }));
        redirectToLoginHandler();
      });
    })
    .catch((error: Error) => {
      if (error.message === EMAIL_ALREADY_IN_USE.errorCode) {
        Alert.alert("Oops...", EMAIL_ALREADY_IN_USE.userMessage);
      }
    });
};
