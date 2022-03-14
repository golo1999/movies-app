// Standard packages
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, View } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";

// Navigation
import { MovieCategoriesStackParamsList } from "../../navigation/MovieCategoriesStack";

// Components
import MovieGenresListItem from "../../components/MovieGenresListItem/MovieGenresListItem";

// Models
import { Movie } from "../../models/Movie";

// Methods
import { getMovieGenresList } from "../../environment/theme/Methods";

// Stylings
import { styles } from "./MovieGenres.styles";

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
