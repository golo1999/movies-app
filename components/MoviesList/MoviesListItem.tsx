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

// Variables
import { COLORS } from "../../themes/variables";

type Props = {
  movie: Movie;
  onPress?: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
};

const MoviesListItem = ({ movie, onPress, style }: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[style, styles.container]}
      underlayColor={COLORS.TERTIARY}
    >
      <View>
        <Image
          resizeMode="stretch"
          source={{ uri: movie.large_cover_image }}
          style={[{ aspectRatio: 1, height: undefined, width: `100%` }]}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.title,
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

const styles = StyleSheet.create({
  container: {
    alignItems: `center`,
    display: `flex`,
    flexBasis: "50%",
    flexDirection: `column`,
  },
  title: { textAlign: `center` },
});
