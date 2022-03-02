// Standard packages
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Loading = ({ message, containerStyle, textStyle }: Props) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{message}</Text>
    </View>
  );
};

export default Loading;
