// Redux store
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux
import authSlice from "./auth-slice";
import moviesListSlice from "./movies-list-slice";
import selectedMovieSlice from "./selected-movie-slice";

const reducersList = combineReducers({
  auth: authSlice.reducer,
  moviesList: moviesListSlice.reducer,
  selectedMovie: selectedMovieSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
  reducer: reducersList,
});
