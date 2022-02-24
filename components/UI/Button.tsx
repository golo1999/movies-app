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
  underlayColor?: string;
};

const CustomButton = ({
  onPress,
  style,
  text,
  textStyle,
  underlayColor,
}: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[style, buttonStyle.button]}
      underlayColor={underlayColor}
    >
      <Text style={[textStyle, buttonStyle.text]}>{text}</Text>
    </TouchableHighlight>
  );
};

const buttonStyle = StyleSheet.create({
  button: { padding: 8 },
  text: { fontSize: 16, fontWeight: `bold`, textAlign: `center` },
});

export default CustomButton;
