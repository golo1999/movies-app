// Standard packages
import { Dimensions, StyleProp, TextStyle, ViewStyle } from "react-native";

// Colors
import COLORS from "./Colors";

interface IgnoreLogsProps {
  asyncStorageDeprecated: string;
  reactNativeGestureHandler: string;
  settingTimer: string;
}

export const APP_NAME: string = "MoviesApp";

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

export const ignoreLogsMessages: IgnoreLogsProps = {
  asyncStorageDeprecated:
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  reactNativeGestureHandler:
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  settingTimer: "Setting a timer for a long period of time",
};

export const MOVIE_DETAILS_URL: string =
  "https://yts.mx/api/v2/movie_details.json";

export const MOVIES_LIST_URL: string = "https://yts.mx/api/v2/list_movies.json";
