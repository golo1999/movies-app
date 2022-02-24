// Standard packages
import React from "react";
import {
  GestureResponderEvent,
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
      <Text style={moviesListItemStyles.title}>{movie.title}</Text>
    </TouchableHighlight>
  );
};

export default MoviesListItem;

const moviesListItemStyles = StyleSheet.create({
  container: {
    alignItems: `center`,
    backgroundColor: `orange`,
    display: `flex`,
    flexDirection: `column`,
    width: `50%`,
  },
  title: { textAlign: `center` },
});
