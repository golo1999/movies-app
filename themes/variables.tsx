import { Dimensions, StyleProp, TextStyle, ViewStyle } from "react-native";

export const colors = {
  PRIMARY: `#003f5c`,
  SECONDARY: `#fb5b5a`,
  TERTIARY: `#465881`,
};

export const authenticationButtonStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.SECONDARY,
  borderRadius:
    Math.round(
      Dimensions.get("window").width + Dimensions.get("window").height
    ) / 2,
};

export const authenticationButtonTextStyle: StyleProp<TextStyle> = {
  color: `white`,
};

export const authenticationInputStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.TERTIARY,
  borderRadius:
    Math.round(
      Dimensions.get("window").width + Dimensions.get("window").height
    ) / 2,
};

export const authenticationInputTextStyle: StyleProp<TextStyle> = {
  color: `white`,
};

export const authenticationRedirectTextStyle: StyleProp<TextStyle> = {
  color: `white`,
  fontSize: 16,
  textAlign: `center`,
};
