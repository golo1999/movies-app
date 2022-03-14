// Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Models
import { User } from "../models/User";

type AuthenticatedUserState = {
  authenticatedUser: User;
};

const initialState = {
  authenticatedUser: {} as AuthenticatedUserState,
  notAuthenticatedUser: new User({
    email: "visitor@mail.com",
    id: "0",
    name: "Visitor",
  }),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthenticatedUser: (state) => {
      state.authenticatedUser = {} as AuthenticatedUserState;
    },
    setAuthenticatedUser: (state, action) => {
      const authenticatedUser: AuthenticatedUserState =
        action.payload.authenticatedUser;

      state.authenticatedUser = authenticatedUser;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
