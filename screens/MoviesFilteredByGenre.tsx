// Standard packages
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
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
      numberOfMovies={filteredMoviesList.length}
    />
  );
};

export default MoviesFilteredByGenre;
