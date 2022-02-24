// Standard packages
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

// Redux
import { selectedMovieActions } from "../../store/selected-movie-slice";

// Navigation
import { RootStackParamsList } from "../../routes/myStackNavigator";

// Components
import MoviesListItem from "./MoviesListItem";

// Models
import { Movie } from "../../models/Movie";

// Variables
import { COLORS } from "../../themes/variables";

type Props = { moviesList: Movie[] };

type MovieDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  `MovieDetails`
>;

const MoviesList = ({ moviesList }: Props) => {
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [numberOfMovies, setNumberOfMovies] = useState(-1);

  const navigation = useNavigation<MovieDetailsScreenProp>();

  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`https://yts.mx/api/v2/list_movies.json`, {
      signal: abortController.signal,
    })
      .then((result) => {
        if (!result.ok) {
          throw Error(`Couldn't fetch movies list length...`);
        }

        return result.json();
      })
      .then((data) => {
        const moviesData = data.data;

        const moviesList: Movie[] = Object.values(moviesData.movies);

        setNumberOfMovies(moviesList.length);
      })
      .catch((error) => {
        if (error.name === `AbortError`) {
          console.log(`fetch aborted`);
        }
      });

    return () => abortController?.abort();
  }, []);

  const listSuccessfullyRetrieved = moviesList.length === numberOfMovies;

  useEffect(() => {
    if (listSuccessfullyRetrieved && pageIsLoading) {
      setPageIsLoading((previousValue) => !previousValue);
    }
  }, [listSuccessfullyRetrieved, pageIsLoading]);

  const logInHandler = () => {
    navigation.navigate("Authentication");
  };

  const moviePressHandler = (movie: Movie) => {
    if (movie) {
      dispatch(selectedMovieActions.clearSelectedMovie());
      dispatch(selectedMovieActions.setSelectedMovie({ selectedMovie: movie }));
      navigation.navigate(`MovieDetails`);
    }
  };

  return (
    <>
      {pageIsLoading && (
        <View style={moviesListStyles.loadingContainer}>
          <Text style={moviesListStyles.loadingText}>Fetching data...</Text>
        </View>
      )}
      {!pageIsLoading && (
        <View style={moviesListStyles.container}>
          <FlatList
            contentContainerStyle={moviesListStyles.moviesList}
            data={moviesList}
            numColumns={2}
            renderItem={({ item: movie }) => (
              <MoviesListItem
                movie={movie}
                onPress={() => moviePressHandler(movie)}
                style={moviesListStyles.moviesListItem}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

export default MoviesList;

const moviesListStyles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
  },
  loadingText: { color: COLORS.SECONDARY, fontSize: 24 },
  moviesList: {
    alignItems: `flex-start`,
    display: `flex`,
  },
  moviesListItem: {
    alignItems: `center`,
    padding: 10,
    justifyContent: `center`,
  },
});
