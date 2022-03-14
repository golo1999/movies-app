// Standard packages
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../../themes/variables";

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
