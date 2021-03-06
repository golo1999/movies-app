// Standard packages
import { StyleSheet } from "react-native";

// Colors
import COLORS from "../../environment/theme/Colors";

export const profileLogoStyles = StyleSheet.create({
  container: { backgroundColor: "white" },
  text: { color: COLORS.PRIMARY },
});

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    flexDirection: "column",
    flexGrow: 1,
  },
});
