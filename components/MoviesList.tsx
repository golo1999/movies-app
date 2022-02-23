// Standard packages
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Models
import { Movie } from "../models/Movie";

// Variables
import { COLORS } from "../themes/variables";

type Props = { moviesList: Movie[] };

const MoviesList = ({ moviesList }: Props) => {
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [numberOfMovies, setNumberOfMovies] = useState(-1);

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

  return (
    <>
      {pageIsLoading && (
        <View style={moviesListStyles.loadingContainer}>
          <Text style={moviesListStyles.loadingText}>Fetching data...</Text>
        </View>
      )}
      {!pageIsLoading && (
        <View>
          <Text>MoviesList</Text>
        </View>
      )}
    </>
  );
};

export default MoviesList;

const moviesListStyles = StyleSheet.create({
  loadingContainer: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
  },
  loadingText: { color: COLORS.SECONDARY, fontSize: 24 },
});
