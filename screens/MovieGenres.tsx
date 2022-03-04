// Standard packages
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Navigation
import { MovieCategoriesStackParamsList } from "../navigation/MovieCategoriesStack";

// Components
import MovieGenresListItem from "../components/MovieGenresListItem";

// Models
import { Movie } from "../models/Movie";

// Methods
import { getMovieGenresList } from "../themes/methods";

// Variables
import { COLORS } from "../themes/variables";

type MovieDetailsScreenProp = NativeStackNavigationProp<
  MovieCategoriesStackParamsList,
  "MovieGenres"
>;

const MovieGenres = () => {
  const moviesList: Movie[] = useSelector(
    (state: RootStateOrAny) => state.moviesList.moviesList
  );

  const navigation = useNavigation<MovieDetailsScreenProp>();

  const movieGenresList = getMovieGenresList(moviesList);

  const genrePressHandler = (genreName: string) => {
    navigation.navigate("MoviesFilteredByGenre", {
      genre: genreName,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={movieGenresList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item: genreName }) => (
          <MovieGenresListItem
            genre={genreName}
            onPress={() => genrePressHandler(genreName)}
            style={styles.listItem}
          />
        )}
      />
    </View>
  );
};

export default MovieGenres;

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.PRIMARY, flex: 1, paddingVertical: 5 },
  list: {
    alignItems: `flex-start`,
    display: `flex`,
  },
  listItem: {
    alignItems: `center`,
    padding: 20,
    justifyContent: `center`,
  },
});
