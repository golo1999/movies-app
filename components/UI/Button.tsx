// Standard packages
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

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
      style={[style, buttonStyle.button]}
      underlayColor={underlayColor}
    >
      <Text style={[textStyle, buttonStyle.text]}>{text}</Text>
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
    <View style={[style, buttonStyle.button]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={[textStyle, buttonStyle.text]}>{text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const buttonStyle = StyleSheet.create({
  button: { padding: 8 },
  text: { fontSize: 16, fontWeight: `bold`, textAlign: `center` },
});

export default CustomButton;
