// Standard packages
import { StyleSheet } from "react-native";

// Colors
import COLORS from "../../environment/theme/Colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.PRIMARY,
    borderWidth: 5,
    display: "flex",
    flexBasis: "50%",
    flexDirection: "column",
  },
  genre: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
