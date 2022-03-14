// Standard packages
import { StyleSheet } from "react-native";

// Colors
import COLORS from "../../environment/theme/Colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 32,
  },
  logo: {
    color: COLORS.SECONDARY,
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
});
