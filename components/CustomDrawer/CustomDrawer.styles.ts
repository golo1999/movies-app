// Standard packages
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../../themes/variables";

export const styles = StyleSheet.create({
  authenticationButton: { marginVertical: 8 },
  authenticationButtonText: { color: "white" },
  container: {
    backgroundColor: COLORS.SECONDARY,
    flex: 1,
  },
  header: { alignItems: "center", flexDirection: "column", marginVertical: 16 },
  headerIcon: { color: "white", fontSize: 36, fontWeight: "bold" },
  headerIconContainer: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 1000,
    justifyContent: "center",
    marginBottom: 8,
    width: "25%",
  },
  headerText: { color: "white", fontSize: 16, textAlign: "center" },
});
