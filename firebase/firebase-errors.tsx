interface FirebaseErrorType {
  errorCode: string;
  userMessage: string;
}

export const EMAIL_ALREADY_IN_USE: FirebaseErrorType = {
  errorCode: "auth/email-already-in-use",
  userMessage: "Email already in use",
};

export const EMAIL_NOT_VERIFIED: FirebaseErrorType = {
  errorCode: "Email not verified",
  userMessage: "Please verify your email first",
};

export const PLEASE_TRY_AGAIN: FirebaseErrorType = {
  errorCode: "Something went wrong",
  userMessage: "Something went wrong! Please try again",
};

export const TOO_MANY_REQUESTS: FirebaseErrorType = {
  errorCode: "auth/too-many-requests",
  userMessage: "Too many requests! Please try again later",
};

export const USER_NOT_FOUND: FirebaseErrorType = {
  errorCode: "auth/user-not-found",
  userMessage: "User not found",
};

export const WRONG_PASSWORD: FirebaseErrorType = {
  errorCode: "auth/wrong-password",
  userMessage: "Incorrect username or password",
};
