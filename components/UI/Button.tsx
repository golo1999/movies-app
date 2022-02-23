// Standard packages
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
} from "react-native";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
  text: string;
  textStyle: StyleProp<TextStyle>;
};

const CustomButton = ({ onPress, style, text, textStyle }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} style={[style, buttonStyle.button]}>
      <Text style={[textStyle, buttonStyle.text]}>{text}</Text>
    </TouchableHighlight>
  );
};

const buttonStyle = StyleSheet.create({
  button: { padding: 8 },
  text: { fontSize: 16, fontWeight: `bold`, textAlign: `center` },
});

export default CustomButton;
