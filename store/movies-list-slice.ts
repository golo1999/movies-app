// Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Models
import { Movie } from "../models/Movie";

const initialState = { moviesList: [] as Movie[] };

const moviesListSlice = createSlice({
  name: `moviesList`,
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const movie: Movie = action.payload.movie;

      state.moviesList.push(movie);
    },
    clearMoviesList: (state) => {
      if (state.moviesList.length > 0) {
        state.moviesList = [];
      }
    },
  },
});

export const moviesListActions = moviesListSlice.actions;

export default moviesListSlice;
