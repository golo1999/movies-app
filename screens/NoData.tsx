// Standard packages
import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface Props {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const NoData = ({ message, containerStyle, textStyle }: Props) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{message}</Text>
    </View>
  );
};

export default NoData;
