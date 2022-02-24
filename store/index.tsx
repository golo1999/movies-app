// Redux store
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux
import moviesListSlice from "./movies-list-slice";
import selectedMovieSlice from "./selected-movie-slice";

const reducersList = combineReducers({
  moviesList: moviesListSlice.reducer,
  selectedMovie: selectedMovieSlice.reducer,
});

export const store = configureStore({
  reducer: reducersList,
});
