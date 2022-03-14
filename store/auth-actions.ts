// Standard packages
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { Dispatch } from "@reduxjs/toolkit";

// Redux
import { authActions } from "./auth-slice";

// Firebase
import { auth, db } from "../environment/firebase/firebase";

// Models
import { User } from "../models/User";

export const fetchAuthenticatedUser = () => {
  return async (dispatch: Dispatch<any>) => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        return;
      }

      onValue(ref(db, `users/${user.uid}/personalInformation`), (snapshot) => {
        const personalInformation: User = snapshot.val();

        if (!personalInformation) {
          return;
        }

        dispatch(
          authActions.setAuthenticatedUser({
            authenticatedUser: personalInformation,
          })
        );
      });
    });
  };
};
