// Standard packages
import React, { MutableRefObject } from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";

type Props = {
  cursorColor?: string;
  onChangeText?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  placeholder?: string;
  placeholderTextColor?: string;
  reference?: MutableRefObject<TextInput>;
  style: StyleProp<ViewStyle>;
  type?: string;
  value?: string;
};

const CustomInput = ({
  cursorColor,
  onChangeText,
  placeholder,
  placeholderTextColor,
  reference,
  style,
  type,
  value,
}: Props) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      ref={reference}
      secureTextEntry={type === `password`}
      selectionColor={cursorColor}
      style={[style, inputStyle.input]}
      value={value}
    />
  );
};

export default CustomInput;

const inputStyle = StyleSheet.create({
  input: { fontSize: 16, paddingHorizontal: 16, paddingVertical: 8 },
});
