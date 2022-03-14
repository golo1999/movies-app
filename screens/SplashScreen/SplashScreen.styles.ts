// Standard packages
import { StyleSheet } from "react-native";

// Colors
import COLORS from "../../environment/theme/Colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    color: COLORS.SECONDARY,
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
