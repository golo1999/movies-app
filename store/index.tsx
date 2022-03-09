// Redux store
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux
import authSlice from "./auth-slice";
import favoriteMoviesListSlice from "./favorite-movies-list-slice";
import moviesListSlice from "./movies-list-slice";
import selectedMovieSlice from "./selected-movie-slice";

const reducersList = combineReducers({
  auth: authSlice.reducer,
  favoriteMoviesList: favoriteMoviesListSlice.reducer,
  moviesList: moviesListSlice.reducer,
  selectedMovie: selectedMovieSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
  reducer: reducersList,
});
