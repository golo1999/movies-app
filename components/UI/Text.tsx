// Standard packages
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  style: StyleProp<TextStyle>;
  text: string;
};

const CustomText = ({ onPress, style, text }: Props) => {
  return (
    <Text onPress={onPress} style={style}>
      {text}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
