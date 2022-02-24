// Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Models
import { User } from "../models/User";

type AuthenticatedUserState = { authenticatedUser: User };

const initialState = { authenticatedUser: {} as AuthenticatedUserState };

const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.authenticatedUser = {} as AuthenticatedUserState;
    },
    setSelectedMovie: (state, action) => {
      const authenticatedUser: AuthenticatedUserState =
        action.payload.authenticatedUser;

      state.authenticatedUser = authenticatedUser;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
