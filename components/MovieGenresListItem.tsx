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

// Variables
import { COLORS } from "../themes/variables";

type Props = {
  genre: string;
  onPress?: (event?: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
};

const MovieGenresListItem = ({ genre, onPress, style }: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[style, styles.container]}
      underlayColor={COLORS.TERTIARY}
    >
      <View>
        <Text numberOfLines={1} style={[styles.genre]}>
          {genre}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default MovieGenresListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: `center`,
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.PRIMARY,
    borderWidth: 5,
    display: `flex`,
    flexBasis: "50%",
    flexDirection: `column`,
  },
  genre: {
    color: "white",
    fontSize: 18,
    fontWeight: `bold`,
    textAlign: `center`,
  },
});
