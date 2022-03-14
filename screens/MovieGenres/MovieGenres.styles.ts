// Standard packages
import { StyleSheet } from "react-native";

// Colors
import COLORS from "../../environment/theme/Colors";

export const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.PRIMARY, flex: 1, paddingVertical: 5 },
  list: {
    alignItems: "flex-start",
    display: "flex",
  },
  listItem: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
});
