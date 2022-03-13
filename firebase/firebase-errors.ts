type FirebaseErrorType = {
  errorCode?: string;
  userMessage: string;
  userMessageTitle: string;
};

export const COULD_NOT_SIGN_OUT: FirebaseErrorType = {
  userMessage: "Couldn't sign out! Please try again",
  userMessageTitle: "Oops!",
};

export const EMAIL_ALREADY_IN_USE: FirebaseErrorType = {
  errorCode: "auth/email-already-in-use",
  userMessage: "Email already in use",
  userMessageTitle: "Oops!",
};

export const EMAIL_NOT_VERIFIED: FirebaseErrorType = {
  errorCode: "Email not verified",
  userMessage: "Please verify your email first",
  userMessageTitle: "Oops!",
};

export const PLEASE_CHECK_YOUR_EMAIL: FirebaseErrorType = {
  userMessage: "Please check your email",
  userMessageTitle: "Email verification sent",
};

export const PLEASE_TRY_AGAIN: FirebaseErrorType = {
  errorCode: "Something went wrong",
  userMessage: "Something went wrong! Please try again",
  userMessageTitle: "Oops!",
};

export const TOO_MANY_REQUESTS: FirebaseErrorType = {
  errorCode: "auth/too-many-requests",
  userMessage: "Too many requests! Please try again later",
  userMessageTitle: "Oops!",
};

export const USER_NOT_FOUND: FirebaseErrorType = {
  errorCode: "auth/user-not-found",
  userMessage: "User not found",
  userMessageTitle: "Oops!",
};

export const WRONG_PASSWORD: FirebaseErrorType = {
  errorCode: "auth/wrong-password",
  userMessage: "Incorrect username or password",
  userMessageTitle: "Oops!",
};
