// Standard packages
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

// Stylings
import { styles as buttonStyles } from "./Button.styles";

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
  text: string;
  textStyle: StyleProp<TextStyle>;
  underlayColor?: string;
}

interface CustomNoUnderlayButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
  text: string;
  textStyle: StyleProp<TextStyle>;
}

const CustomButton = ({
  onPress,
  style,
  text,
  textStyle,
  underlayColor,
}: CustomButtonProps) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[style, buttonStyles.button]}
      underlayColor={underlayColor}
    >
      <Text style={[textStyle, buttonStyles.text]}>{text}</Text>
    </TouchableHighlight>
  );
};

export const CustomNoUnderlayButton = ({
  onPress,
  style,
  text,
  textStyle,
}: CustomNoUnderlayButtonProps) => {
  return (
    <View style={[style, buttonStyles.button]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={[textStyle, buttonStyles.text]}>{text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomButton;
