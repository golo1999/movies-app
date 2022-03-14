// Standard packages
import { Dimensions, StyleProp, TextStyle, ViewStyle } from "react-native";

export const APP_NAME: string = "MoviesApp";

export const COLORS = {
  PRIMARY: "#003f5c",
  SECONDARY: "#fb5b5a",
  TERTIARY: "#465881",
};

export const authenticationButtonStyle: StyleProp<ViewStyle> = {
  backgroundColor: COLORS.SECONDARY,
  borderRadius:
    Math.round(
      Dimensions.get("window").width + Dimensions.get("window").height
    ) / 2,
};

export const authenticationButtonTextStyle: StyleProp<TextStyle> = {
  color: "white",
};

export const authenticationInputStyle: StyleProp<ViewStyle> = {
  backgroundColor: COLORS.TERTIARY,
  borderRadius:
    Math.round(
      Dimensions.get("window").width + Dimensions.get("window").height
    ) / 2,
};

export const authenticationInputTextStyle: StyleProp<TextStyle> = {
  color: "white",
};

export const authenticationRedirectTextStyle: StyleProp<TextStyle> = {
  color: "white",
  fontSize: 16,
  textAlign: "center",
};

export const MOVIE_DETAILS_URL: string =
  "https://yts.mx/api/v2/movie_details.json";

export const MOVIES_LIST_URL: string = "https://yts.mx/api/v2/list_movies.json";
