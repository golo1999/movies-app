// Standard packages
import React from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";

type Props = {
  cursorColor?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  style: StyleProp<ViewStyle>;
  type?: string;
};

const CustomInput = ({
  cursorColor,
  placeholder,
  placeholderTextColor,
  style,
  type,
}: Props) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={type === `password`}
      selectionColor={cursorColor}
      style={[style, inputStyle.input]}
    />
  );
};

export default CustomInput;

const inputStyle = StyleSheet.create({
  input: { fontSize: 16, paddingHorizontal: 16, paddingVertical: 8 },
});
