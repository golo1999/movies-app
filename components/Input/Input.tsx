// Standard packages
import React, { MutableRefObject } from "react";
import { StyleProp, TextInput, ViewStyle } from "react-native";

// Stylings
import { styles as inputStyles } from "./Input.styles";

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
  onBlur?: (e: any) => void;
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
  onBlur,
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
      onBlur={onBlur}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      ref={reference}
      secureTextEntry={type === "password"}
      selectionColor={cursorColor}
      style={[style, inputStyles.input]}
      value={value}
    />
  );
};

export default CustomInput;
