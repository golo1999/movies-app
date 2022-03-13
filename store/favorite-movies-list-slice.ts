// Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Models
import { Movie } from "../models/Movie";

const initialState = { favoriteMoviesList: [] as Movie[] };

const favoriteMoviesListSlice = createSlice({
  name: "favoriteMoviesList",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      const favoriteMovie: Movie = action.payload.favoriteMovie;

      state.favoriteMoviesList.push(favoriteMovie);
    },
    clearFavoriteMoviesList: (state) => {
      if (state.favoriteMoviesList.length > 0) {
        state.favoriteMoviesList = [];
      }
    },
  },
});

export const favoriteMoviesListActions = favoriteMoviesListSlice.actions;

export default favoriteMoviesListSlice;
