import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { Alert } from "react-native";

import { auth } from "./firebase";
import { EMAIL_ALREADY_IN_USE } from "./firebase-errors";

// Methods
import { createPersonalInformationPath } from "../themes/methods";

// Models
import { User } from "../models/User";

interface RegisterUserProps {
  email: string;
  name: string;
  password: string;
  redirectToLoginHandler: () => void;
}

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
      if (error.message === EMAIL_ALREADY_IN_USE.errorMessage) {
        Alert.alert("Error", EMAIL_ALREADY_IN_USE.userMessage);
      }
    });
};
