// Standard packages
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Environment variables
import {
  API_KEY as apiKey,
  AUTH_DOMAIN as authDomain,
  APP_ID as appId,
  DATABASE_URL as databaseURL,
  MESSAGING_SENDER_ID as messagingSenderId,
  PROJECT_ID as projectId,
  STORAGE_BUCKET as storageBucket,
} from "@env";

const firebaseConfig = {
  apiKey,
  appId,
  authDomain,
  databaseURL,
  messagingSenderId,
  projectId,
  storageBucket,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = getDatabase(app);

export const provider = new EmailAuthProvider();
