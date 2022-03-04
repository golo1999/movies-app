import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

import {
  API_KEY as apiKey,
  AUTH_DOMAIN as authDomain,
  PROJECT_ID as projectId,
  STORAGE_BUCKET as storageBucket,
  MESSAGING_SENDER_ID as messagingSenderId,
  APP_ID as appId,
} from "@env";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const db = app.database();

export const provider = new firebase.auth.EmailAuthProvider();

export default app;
