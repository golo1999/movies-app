// Standard packages
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";

// Variables
import { COLORS } from "../../themes/variables";

// Stylings
import { styles } from "./MovieGenresListItem.styles";

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
