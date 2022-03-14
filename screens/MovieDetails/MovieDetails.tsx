// Standard packages
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import StarRating from "react-native-star-rating";
import { RootStateOrAny, useSelector } from "react-redux";

// Models
import { Movie } from "../../models/Movie";

// Methods
import { getFormattedMovieGenresList } from "../../themes/methods";

// Stylings
import { styles } from "./MovieDetails.styles";

interface Props {
  addedToFavorites: boolean;
}

const MovieDetails = ({ addedToFavorites }: Props) => {
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

  console.log(`favorites: ${addedToFavorites}`);

  return (
    <ScrollView contentContainerStyle={[styles.mainContainer]}>
      {typeof image === "string" && (
        <Image
          resizeMode="stretch"
          source={{ uri: image }}
          style={styles.image}
        />
      )}
      <View style={styles.detailsContainer}>
        {typeof title === "string" && (
          <Text style={[styles.heading, { marginBottom: 8 }]}>
            {formattedMovieTitle}
          </Text>
        )}
        {typeof rating === "number" && (
          <StarRating
            disabled
            emptyStarColor={"gold"}
            fullStarColor={"gold"}
            maxStars={5}
            rating={rating / 2}
            containerStyle={[{ marginVertical: 8 }]}
          />
        )}
        {typeof synopsis === "string" && synopsis !== "" && (
          <View style={[{ marginVertical: 8 }]}>
            <Text style={[styles.heading, { marginBottom: 4 }]}>Synopsis</Text>
            <Text style={[styles.text, { marginTop: 4 }]}>{synopsis}</Text>
          </View>
        )}
        {Array.isArray(genresList) && genresList.length > 0 && (
          <View style={[{ marginVertical: 8 }]}>
            <Text style={[styles.heading, { marginBottom: 4 }]}>Genres</Text>
            <Text style={[styles.text, { fontStyle: "italic" }]}>
              {getFormattedMovieGenresList(genresList)}
            </Text>
          </View>
        )}
        {typeof runtime === "number" && (
          <View style={[{ marginVertical: 8 }]}>
            <Text style={styles.heading}>Runtime</Text>
            <Text style={styles.text}>{formattedMovieRuntime}</Text>
          </View>
        )}
        {typeof dateUploaded === "string" && (
          <View>
            <Text style={styles.heading}>Upload date</Text>
            <Text style={styles.text}>{dateUploaded}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieDetails;
