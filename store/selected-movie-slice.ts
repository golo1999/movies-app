// Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Models
import { Movie } from "../models/Movie";

type SelectedMovieState = { selectedMovie: Movie };

const initialState = { selectedMovie: {} as SelectedMovieState };

const selectedMovieSlice = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = {} as SelectedMovieState;
    },
    setSelectedMovie: (state, action) => {
      const selectedMovie: SelectedMovieState = action.payload.selectedMovie;

      state.selectedMovie = selectedMovie;
    },
  },
});

export const selectedMovieActions = selectedMovieSlice.actions;

export default selectedMovieSlice;
