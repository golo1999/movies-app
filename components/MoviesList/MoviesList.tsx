// Standard packages
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch } from "react-redux";

// Redux
import { selectedMovieActions } from "../../store/selected-movie-slice";

// Navigation
import { MoviesStackParamsList } from "../../navigation/MoviesStack";

// Screens
import Loading from "../../screens/Loading";
import NoData from "../../screens/NoData";

// Components
import MoviesListItem from "../MoviesListItem/MoviesListItem";

// Models
import { Movie } from "../../models/Movie";

// Stylings
import { styles } from "./MoviesList.styles";

type Props = {
  loadingMessage: string;
  moviesList: Movie[];
  noDataMessage: string;
  numberOfMovies: number;
};

type MovieDetailsScreenProp = NativeStackNavigationProp<
  MoviesStackParamsList,
  "Movies"
>;

const MoviesList = ({
  loadingMessage,
  moviesList,
  noDataMessage,
  numberOfMovies,
}: Props) => {
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const navigation = useNavigation<MovieDetailsScreenProp>();

  const dispatch = useDispatch();

  const listSuccessfullyRetrieved = moviesList.length === numberOfMovies;

  useFocusEffect(
    useCallback(() => {
      if (listSuccessfullyRetrieved && pageIsLoading) {
        setPageIsLoading((previousValue) => !previousValue);
      }
    }, [listSuccessfullyRetrieved, pageIsLoading])
  );

  const moviePressHandler = (movie: Movie) => {
    if (movie) {
      dispatch(selectedMovieActions.clearSelectedMovie());
      dispatch(selectedMovieActions.setSelectedMovie({ selectedMovie: movie }));
      navigation.navigate("MovieDetails");
    }
  };

  return (
    <>
      {pageIsLoading ? (
        <Loading
          containerStyle={styles.loadingContainer}
          message={loadingMessage}
          textStyle={styles.loadingText}
        />
      ) : moviesList.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.moviesList}
            data={moviesList}
            numColumns={2}
            renderItem={({ item: movie }) => (
              <MoviesListItem
                movie={movie}
                onPress={() => moviePressHandler(movie)}
                style={styles.moviesListItem}
              />
            )}
          />
        </View>
      ) : (
        <NoData
          containerStyle={styles.loadingContainer}
          message={noDataMessage}
          textStyle={styles.loadingText}
        />
      )}
    </>
  );
};

export default MoviesList;
