// Standard packages
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

// Components
import MoviesList from "../components/MoviesList/MoviesList";

// Models
import { Movie } from "../models/Movie";

// Methods
import { getMoviesListByGenre } from "../themes/methods";

const MoviesFilteredByGenre = () => {
  const route = useRoute<RouteProp<{ params: { genre: string } }>>();

  const selectedMoviesGenre: string = route.params.genre;

  const moviesList: Movie[] = useSelector(
    (state: RootStateOrAny) => state.moviesList.moviesList
  );

  const filteredMoviesList = getMoviesListByGenre(
    moviesList,
    selectedMoviesGenre
  );

  return (
    <MoviesList
      loadingMessage={`Filtering ${selectedMoviesGenre.toLowerCase()} movies...`}
      moviesList={filteredMoviesList}
      noDataMessage="No data found..."
      numberOfMovies={filteredMoviesList.length}
    />
  );
};

export default MoviesFilteredByGenre;
