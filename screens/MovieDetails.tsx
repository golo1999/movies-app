// Standard packages
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import StarRating from "react-native-star-rating";
import { RootStateOrAny, useSelector } from "react-redux";

// Models
import { Movie } from "../models/Movie";

// Methods
import { getFormattedMovieGenresList } from "../themes/methods";

// Variables
import { COLORS } from "../themes/variables";

const MovieDetails = () => {
  const selectedMovie: Movie = useSelector(
    (state: RootStateOrAny) => state.selectedMovie.selectedMovie
  );

  const formattedMovieTitle = `${selectedMovie.title} (${selectedMovie.year})`;

  const formattedMovieRuntime = `${selectedMovie.runtime} minutes`;

  return (
    <ScrollView contentContainerStyle={[movieDetailsStyle.mainContainer]}>
      <Image
        resizeMode="stretch"
        source={{ uri: selectedMovie.large_cover_image }}
        style={movieDetailsStyle.image}
      />
      <View style={movieDetailsStyle.detailsContainer}>
        <Text style={[movieDetailsStyle.heading, { marginBottom: 8 }]}>
          {formattedMovieTitle}
        </Text>
        <StarRating
          disabled
          emptyStarColor={`gold`}
          fullStarColor={`gold`}
          maxStars={5}
          rating={selectedMovie.rating / 2}
          containerStyle={[{ marginVertical: 8 }]}
        />
        {selectedMovie.synopsis !== `` && (
          <View style={[{ marginVertical: 8 }]}>
            <Text style={[movieDetailsStyle.heading, { marginBottom: 4 }]}>
              Synopsis
            </Text>
            <Text style={[movieDetailsStyle.text, { marginTop: 4 }]}>
              {selectedMovie.synopsis}
            </Text>
          </View>
        )}
        <View style={[{ marginVertical: 8 }]}>
          <Text style={[movieDetailsStyle.heading, { marginBottom: 4 }]}>
            Genres
          </Text>
          <Text style={[movieDetailsStyle.text, { fontStyle: `italic` }]}>
            {getFormattedMovieGenresList(selectedMovie.genres)}
          </Text>
        </View>
        <View style={[{ marginVertical: 8 }]}>
          <Text style={movieDetailsStyle.heading}>Runtime</Text>
          <Text style={movieDetailsStyle.text}>{formattedMovieRuntime}</Text>
        </View>
        <View style={[{ marginVertical: 8 }]}>
          <Text style={movieDetailsStyle.heading}>Upload date</Text>
          <Text style={movieDetailsStyle.text}>
            {selectedMovie.date_uploaded}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

const movieDetailsStyle = StyleSheet.create({
  detailsContainer: { margin: 16 },
  heading: { color: COLORS.SECONDARY, fontSize: 36, fontWeight: `bold` },
  image: { aspectRatio: 1, height: undefined, width: `100%` },
  mainContainer: {},
  text: { color: `white`, fontSize: 16, textAlign: `justify` },
});
