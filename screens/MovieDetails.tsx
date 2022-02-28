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

  const {
    date_uploaded: dateUploaded,
    genres: genresList,
    large_cover_image: image,
    rating,
    runtime,
    synopsis,
    title,
    year,
  } = selectedMovie;

  const formattedMovieTitle = `${title} (${year})`;

  const formattedMovieRuntime = `${runtime} minutes`;

  return (
    <ScrollView contentContainerStyle={[movieDetailsStyle.mainContainer]}>
      {typeof image === `string` && (
        <Image
          resizeMode="stretch"
          source={{ uri: image }}
          style={movieDetailsStyle.image}
        />
      )}
      <View style={movieDetailsStyle.detailsContainer}>
        {typeof title === `string` && (
          <Text style={[movieDetailsStyle.heading, { marginBottom: 8 }]}>
            {formattedMovieTitle}
          </Text>
        )}
        {typeof rating === `number` && (
          <StarRating
            disabled
            emptyStarColor={`gold`}
            fullStarColor={`gold`}
            maxStars={5}
            rating={rating / 2}
            containerStyle={[{ marginVertical: 8 }]}
          />
        )}
        {typeof synopsis === `string` && synopsis !== `` && (
          <View style={[{ marginVertical: 8 }]}>
            <Text style={[movieDetailsStyle.heading, { marginBottom: 4 }]}>
              Synopsis
            </Text>
            <Text style={[movieDetailsStyle.text, { marginTop: 4 }]}>
              {synopsis}
            </Text>
          </View>
        )}
        {Array.isArray(genresList) && genresList.length > 0 && (
          <View style={[{ marginVertical: 8 }]}>
            <Text style={[movieDetailsStyle.heading, { marginBottom: 4 }]}>
              Genres
            </Text>
            <Text style={[movieDetailsStyle.text, { fontStyle: `italic` }]}>
              {getFormattedMovieGenresList(genresList)}
            </Text>
          </View>
        )}
        {typeof runtime === `number` && (
          <View style={[{ marginVertical: 8 }]}>
            <Text style={movieDetailsStyle.heading}>Runtime</Text>
            <Text style={movieDetailsStyle.text}>{formattedMovieRuntime}</Text>
          </View>
        )}
        {typeof dateUploaded === `string` && (
          <View>
            <Text style={movieDetailsStyle.heading}>Upload date</Text>
            <Text style={movieDetailsStyle.text}>{dateUploaded}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

const movieDetailsStyle = StyleSheet.create({
  detailsContainer: { margin: 16 },
  heading: { color: COLORS.SECONDARY, fontSize: 36, fontWeight: `bold` },
  image: { aspectRatio: 1, height: undefined, width: `100%` },
  mainContainer: { backgroundColor: COLORS.PRIMARY },
  text: { color: `white`, fontSize: 16, textAlign: `justify` },
});
