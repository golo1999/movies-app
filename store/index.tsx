// Redux store
import { configureStore } from "@reduxjs/toolkit";

// Redux
import moviesListSlice from "./movies-list-slice";

export const store = configureStore({
  reducer: { moviesList: moviesListSlice.reducer },
});
