// Standard packages
import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";

// Models
import { Movie } from "../../models/Movie";

type Props = {
  movie: Movie;
  onPress?: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
};

const MoviesListItem = ({ movie, onPress, style }: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[style, moviesListItemStyles.container]}
    >
      <View>
        <Image
          resizeMode="stretch"
          source={{ uri: movie.large_cover_image }}
          style={[{ aspectRatio: 1, height: undefined, width: `100%` }]}
        />
        <Text
          style={[
            moviesListItemStyles.title,
            {
              color: `white`,
              fontSize: 16,
              fontWeight: `bold`,
              marginVertical: 4,
            },
          ]}
        >
          {movie.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default MoviesListItem;

const moviesListItemStyles = StyleSheet.create({
  container: {
    alignItems: `center`,
    display: `flex`,
    flexDirection: `column`,
    width: `50%`,
  },
  title: { textAlign: `center` },
});
